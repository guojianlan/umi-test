import React, { useState } from 'react';
import { Form, Input } from 'antd';
import {
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  ProfileTwoTone,
} from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
let { Item } = Form;
let { Password } = Input;

export const Index: React.FC<{ form: FormInstance }> = ({ form }) => {
  let [captchaTime, setCaptchaTime] = useState<any>(+new Date());
  return (
    <div>
      <Item
        name="username"
        rules={[{ required: true, message: '请输入邮箱或者手机' }]}
      >
        <Input placeholder="请输入邮箱或者手机" prefix={<MailTwoTone />} />
      </Item>
      <Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Password placeholder="请输入密码" prefix={<LockTwoTone />} />
      </Item>
      <div className="display--flex">
        <div className="flex--1">
          <Item
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
              { min: 4, message: '请填写四位数的验证码' },
              { max: 4, message: '请填写四位数的验证码' },
            ]}
          >
            <Input
              minLength={4}
              maxLength={4}
              placeholder="请输入验证码"
              prefix={<ProfileTwoTone />}
            />
          </Item>
        </div>
        <div>
          <img
            onClick={() => {
              setCaptchaTime(+new Date());
            }}
            src={`/admin/user/getCaptcha?t=${captchaTime}`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Index;
