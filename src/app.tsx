import { RequestConfig, history } from 'umi';
import { message } from 'antd';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { findAdminUserMe } from '@/services/admin_user';

let i = 0;

export async function getInitialState(): Promise<any> {
  //判断是否有登录状态
  console.log('getInitialState', i++);
  if (localStorage.getItem('admin_auth_token')) {
    //  存在admin_auth_token
    let user = await findAdminUserMe();
    if (!user.success) {
      //未登录
      history.push('/login');
    } else {
      return {
        current_user: user.data,
      };
    }
  } else {
    history.push('/login');
    return {};
  }
}
export interface IDataInfo<T> {
  data: T;
  success: false;
  errorCode: number;
  errorMessage: string;
}
//添加拦截器
export interface AppCustomError {
  name: string;
  data: any;
  type: string;
  info?: IDataInfo<any>;
  response: {
    status: number;
    statusText: string;
    url: string;
  };
}
export const request: RequestConfig = {
  requestInterceptors: [
    (url, options) => {
      console.log(options);
      options.headers = {
        ...options.headers,
        admin_auth_token: localStorage.getItem('admin_auth_token') || '',
      };
      return {
        url,
        options: {
          ...options,
        },
      };
    },
  ],

  errorHandler: (error: AppCustomError) => {
    const { response } = error;
    if (response) {
      console.log('response', response);
    }
    if (error.name == 'BizError' && error.info) {
      let { data, success, errorCode, errorMessage } = error.info;
      // 返回false的异常
      if (errorCode == 40001) {
        message.error({
          content: errorMessage,
        });
        history.replace('/login');
        return;
      }
      if (errorCode == 40012) {
        message.error({
          content: data.context
            .map((item: any) => Object.values(item))
            .join(``),
        });
      } else {
        message.error({
          content: errorMessage,
          // onClose: () => {
          //   history.replace('/');
          // },
        });
      }
      return Promise.reject(error.info);
    }
    // 无法处理，跳转404或者可以做日志收集
    message.error({
      content: '未知错误,请等待修复',
      onClose: () => {
        window.location.href = '/';
      },
    });
  },
};

const Footer = () => {
  return <div>222</div>;
};
//需要在umirc.ts配置layout选项
// export const layout = ({ initialState }: any): BasicLayoutProps => {
//   return {
//     logout: () => {
//       console.log(1);
//     }, // do something
//     // rightContentRender: () => <RightContent />, //右上角
//     breadcrumbRender: (routers) => {
//       if (routers) {
//         return [
//           {
//             path: '/',
//             breadcrumbName: '首页',
//           },
//           ...routers,
//         ];
//       } else {
//         return [];
//       }
//     },
//     footerRender: () => <Footer />,
//     onPageChange: (...args) => {
//       // console.log(args);
//       // console.log(initialState);
//     },
//     menuHeaderRender: undefined,
//     ...initialState,
//   };
// };
