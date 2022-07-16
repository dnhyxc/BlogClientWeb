/*
 * @Description: 登录页
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\view\login\index.tsx
 */
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { register, login } from '@/service';
import { normalizeResult } from '@/utils/tools';
import { LoginData } from '@/typings/common';
import styles from './index.less';

const Login = () => {
  const navigate = useNavigate();

  const toDetail = async () => {
    const res = normalizeResult<LoginData>(
      await login({ username: 'dnhyxc', password: 'dnh@06130614' })
    );
    if (res.success) {
      navigate('home');
    } else {
      message.error(res.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div className={styles.list}>
            <Button type="primary" onClick={toDetail}>
              登陆
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
