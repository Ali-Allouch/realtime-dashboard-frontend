import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    errorMessage: "",
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.errorMessage = "";
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        this.token = res.data.token;
        this.user = res.data.user;

        localStorage.setItem("token", this.token as string);

        return { success: true };
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          "Something went wrong, please try again later.";
        return { success: false, message: this.errorMessage };
      } finally {
        this.loading = false;
      }
    },
    async register(name: string, email: string, password: string) {
      this.loading = true;
      this.errorMessage = "";
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            name,
            email,
            password,
          },
        );

        this.token = res.data.token;
        this.user = res.data.user;
        localStorage.setItem("token", this.token as string);

        return { success: true };
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          "Registration failed, please try again later.";
        return { success: false };
      } finally {
        this.loading = false;
      }
    },
  },
});
