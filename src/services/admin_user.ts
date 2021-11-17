import { request } from 'umi';

export const findAdminUserMe = () => {
  return request<any>('/admin/user/me', {
    skipErrorHandler: false,
  });
};

export const loginByAdminUserName = (body: any) => {
  return request<any>('/admin/user/loginByUserName', {
    method: 'post',
    data: body,
  });
};
