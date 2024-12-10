import { defineStore } from "pinia";
import urlCore from "@/urlCore";
import axios from "axios";

export const useGlobalstore = defineStore("globalStore", {
  state: () => {
    return {
      authToken: localStorage.getItem('authToken'),
      fullLoading: false
    };
  },
  actions: {
    async login(username, password) {
      try {
        const resp = await axios.post(urlCore.login, {
          username: username,
          password: password,
        });
        
        localStorage.setItem("authToken", resp.data.access); 
        this.authToken = resp.data.access
        return true;
      } catch (error) {
        console.error('Error during login:', error);
        return false;
      }
    }
  }
});
