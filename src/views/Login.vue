<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMsg = ref("");

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  errorMsg.value = "";
  const result = await authStore.login(email.value, password.value);

  if (result.success) {
    router.push("/dashboard");
  } else {
    errorMsg.value = result.message as string;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to your Real-time Dashboard
        </p>
      </div>
      <form class="mt-8 space-y-4" @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Email address"
        />

        <input
          v-model="password"
          type="password"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Password"
        />

        <p
          v-if="errorMsg"
          class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center"
        >
          {{ errorMsg }}
        </p>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full flex justify-center py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:cursor-pointer focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="authStore.loading" class="flex items-center gap-2">
            Signing in...
          </span>
          <span v-else>Sign in</span>
        </button>
      </form>

      <div class="text-center">
        <router-link
          to="/register"
          class="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
        >
          Don't have an account? Sign up
        </router-link>
      </div>
    </div>
  </div>
</template>
