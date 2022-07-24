/*
 * @Description: 登录页
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\view\login\index.tsx
 */
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import useStore from '@/store';
import { register, login, updateInfo } from '@/service';
import { normalizeResult } from '@/utils/tools';
import { LoginData, UpdateData } from '@/typings/common';
import styles from './index.less';

const Login = () => {
  const navigate = useNavigate();
  const { userInfoStore } = useStore();

  const onLogin = async () => {
    const res = normalizeResult<LoginData>(
      await login({ username: 'cxcx', password: 'dnh@902209' })
    );
    if (res.success) {
      const { id, username, avatar } = res.data;
      // 将登录信息保存到store中
      userInfoStore.setUserInfo({
        userId: id,
        username,
        avatar,
      });
      localStorage.setItem('token', res.data.token);
      navigate('home');
    } else {
      res.message && message.error(res.message);
    }
  };

  const updateUserInfo = async () => {
    const res = normalizeResult<UpdateData>(await updateInfo({ password: 'dnh@06130614' }));
    if (res.success) {
      message.success(res.message);
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      message.error(res.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div className={styles.list}>
            <Button type="primary" onClick={onLogin}>
              登陆
            </Button>
            <Button type="primary" onClick={updateUserInfo}>
              修改用户信息
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
