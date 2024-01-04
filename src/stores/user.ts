import { register, login, logout } from '@/apis/auth';
import { changeUser } from '@/apis/user';
import { defineStore } from 'pinia';

interface ILogin {
  email: string
  password: string
}

interface IRegister extends ILogin {
  username: string
}

const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
  }),
  actions: {
    setUser(user: any) {
      console.log(user);
      this.user = user;
    },
    /**
     * 註冊
     * @param {string} email 電子信箱
     * @param {string} password 密碼
     * @param {string} username 帳號
     */
    async registerUser({ email, username, password }: IRegister) {
      const user = await register(email, username, password);
      this.setUser(user);
    },
    /**
     * 登入
     * @param {string} email 電子信箱
     * @param {string} username 帳號
     */
    async loginUser({ email, password }: ILogin) {
      // try {
      const user = await login(email, password);
      this.setUser(user);
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async updateUser(user) {
      const updatedUser = await changeUser(user);
      this.setUser(updatedUser);
    },
    async logoutUser() {
      logout();
      this.setUser({});
    },
  },
  getters: {
  },
});

export default useUserStore;
