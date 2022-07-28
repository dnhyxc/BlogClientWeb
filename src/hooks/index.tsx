import { useEffect, useState } from 'react';
import { message } from 'antd';
import useStore from '@/store';
import { useNavigate, useLocation } from 'react-router-dom';

export const useHtmlWidth = () => {
  const [htmlWidth, setHtmlWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onResize = () => {
    const width = window.innerWidth;
    setHtmlWidth(width);
  };

  return { htmlWidth };
};

export const useLoginStatus = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { commonStore } = useStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const setAlertStatus = (status: boolean) => {
    setShowAlert(status);
  };

  const toLogin = () => {
    commonStore.setAuth({ redirectUrl: pathname });
    navigate('/login');
  };

  const setResult = (res: any, callback?: Function) => {
    if (res.success) {
      callback && callback();
    }
    if (!res.success && res.code === 409) {
      setAlertStatus(true);
    }
    if (!res.success && res.code !== 409) {
      message.error(res.message);
    }
  };

  return { showAlert, toLogin, onCloseAlert, setAlertStatus, setResult };
};
