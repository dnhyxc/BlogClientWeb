import { makeAutoObservable } from 'mobx';

export interface Auth {
  token?: string;
  isAdmin?: boolean;
  redirectUrl?: string;
  hasAuth?: boolean;
}

class CommonStore {
  constructor() {
    makeAutoObservable(this);
  }

  auth: Auth = {
    token: '',
    isAdmin: false,
    hasAuth: false,
    redirectUrl: '/login',
  };

  setAuth(value: Auth) {
    this.auth = value;
  }
}

export default new CommonStore();
