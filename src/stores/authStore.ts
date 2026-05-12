import { defineStore } from "pinia";
import axios from "axios";
import type { User } from "../models/User";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
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
    async fetchUser() {
      if (!this.token) return;

      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = response.data;
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    },
    async updateProfile(newName: string) {
      this.loading = true;
      this.errorMessage = "";

      try {
        const response = await axios.put(
          "http://localhost:5000/api/users/profile",
          { name: newName },
          {
            headers: { Authorization: `Bearer ${this.token}` },
          },
        );

        this.user = response.data.user;
        return { success: true };
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message || "Failed to update profile";
        return { success: false };
      } finally {
        this.loading = false;
      }
    },
    async changePassword(passwords: {
      currentPassword: string;
      newPassword: string;
    }) {
      this.loading = true;
      this.errorMessage = "";

      try {
        await axios.put(
          "http://localhost:5000/api/users/change-password",
          passwords,
          { headers: { Authorization: `Bearer ${this.token}` } },
        );
        return { success: true };
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message || "Failed to update password";
        return { success: false };
      } finally {
        this.loading = false;
      }
    },
  },
});
