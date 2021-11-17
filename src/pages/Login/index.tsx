import React, { useState } from 'react';
import { Button, Form, Tabs } from 'antd';
const { TabPane } = Tabs;
import styles from './index.less';
import Username from './username';
import { loginByAdminUserName } from '@/services/admin_user';
import { Link } from 'umi';

const Login = (props: any) => {
  let [activeKey, setActiveKey] = useState<string>('account');
  const [form] = Form.useForm();
  let loginUserNameAction = async (values: any) => {
    let result = await loginByAdminUserName(values);
    if (result.success) {
      localStorage.setItem('admin_auth_token', result.data);
      // window.location.href = '/';
    }
  };
  const pushForm = async (values: any) => {
    await loginUserNameAction(values);
  };
  return (
    <div className={styles.login}>
      <Form form={form} size="large" onFinish={pushForm}>
        <Tabs
          defaultActiveKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
        >
          <TabPane tab="账号密码登录" key="account">
            {activeKey == 'account' && <Username form={form}></Username>}
          </TabPane>
          {/* <TabPane tab="手机号登录" key="mobile">
            {activeKey == 'mobile' && <Mobile form={form}></Mobile>}
          </TabPane> */}
        </Tabs>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button htmlType="submit" type="primary">
            登录
          </Button>
          <Link to={'/register'}>注册</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
