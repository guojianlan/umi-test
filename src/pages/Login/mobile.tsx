import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { isTelPhoneNumber } from '@utils';

import {
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  ProfileTwoTone,
} from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { useRequest } from 'umi';
let { Item } = Form;
let { Password } = Input;

export const Index: React.FC<{ form: FormInstance }> = ({ form }) => {
  let [captchaTime, setCaptchaTime] = useState(+new Date());
  // let [sendCode, setSentCode] = useState(false);

  let [timeCount, setTimeCount] = useState(0);
  let [showModal, setShowModal] = useState(false);
  let [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    let timer: any;
    if (timeCount > 0) {
      timer = setTimeout(() => {
        setTimeCount(timeCount - 1);
      }, 1000);
    } else {
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [timeCount]);
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleOk = () => {
    setConfirmLoading(true);

    // 发送验证码
    // sendCode
    //   .run(form.getFieldValue('mobile'), form.getFieldValue('captcha'))
    //   .finally(() => {
    //     setConfirmLoading(false);
    //   });
  };
  const getCode = () => {
    if (isTelPhoneNumber(form.getFieldValue('mobile'))) {
      setCaptchaTime(+new Date());
      setShowModal(true);
    } else {
      message.error('请填写正确的手机号码');
    }
  };
  return (
    <div>
      <Modal
        title="发送验证码"
        onOk={handleOk}
        okText="发送"
        visible={showModal}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="display--flex">
          <Item className="flex--1" name="captcha">
            <Input placeholder="请输入图中验证码" />
          </Item>
          <img
            onClick={() => {
              setCaptchaTime(+new Date());
            }}
            src={`/api/user/getCaptcha?t=${captchaTime}`}
            alt=""
          />
        </div>
      </Modal>
      <Item
        name="mobile"
        rules={[{ required: true, message: '请输入手机号码' }]}
      >
        <Input placeholder="请输入手机号码" prefix={<MobileTwoTone />} />
      </Item>
      <div className="display--flex">
        <div className="flex--1">
          <Item
            name="mobile_code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input placeholder="请输入验证码" prefix={<ProfileTwoTone />} />
          </Item>
        </div>
        <div style={{ marginLeft: 10 }}>
          <Button disabled={timeCount > 0} onClick={getCode}>
            {timeCount == 0 ? '获取验证码' : `倒计时${timeCount}s`}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Index;
