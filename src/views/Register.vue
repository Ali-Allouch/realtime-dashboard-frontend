<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
const authStore = useAuthStore();
const router = useRouter();

const isPasswordStrong = computed(() => passwordRegex.test(password.value));

const handleRegister = async () => {
  if (!isPasswordStrong.value) {
    authStore.errorMessage =
      "Password must be at least 8 characters, include uppercase, lowercase, and a number.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    authStore.errorMessage = "Passwords do not match!";
    return;
  }

  const result = await authStore.register(
    name.value,
    email.value,
    password.value,
  );
  if (result.success) {
    router.push("/dashboard");
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div
      class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
    >
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Create Account</h2>
        <p class="mt-2 text-sm text-gray-500">Join our real-time community</p>
      </div>

      <div
        v-if="authStore.errorMessage"
        class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center"
      >
        {{ authStore.errorMessage }}
      </div>

      <form class="mt-8 space-y-4" @submit.prevent="handleRegister">
        <input
          v-model="name"
          type="text"
          required
          placeholder="Full Name"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />

        <input
          v-model="email"
          type="email"
          required
          placeholder="Email address"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />

        <input
          v-model="password"
          type="password"
          required
          placeholder="Password"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />

        <div class="space-y-1">
          <p
            class="text-xs transition-colors"
            :class="password.length >= 8 ? 'text-green-500' : 'text-gray-400'"
          >
            ● Minimum 8 characters
          </p>
          <p
            class="text-xs transition-colors"
            :class="
              /[A-Z]/.test(password) && /[a-z]/.test(password)
                ? 'text-green-500'
                : 'text-gray-400'
            "
          >
            ● Upper & Lowercase letters
          </p>
          <p
            class="text-xs transition-colors"
            :class="/\d/.test(password) ? 'text-green-500' : 'text-gray-400'"
          >
            ● At least one number
          </p>
        </div>

        <input
          v-model="confirmPassword"
          type="password"
          required
          placeholder="Confirm Password"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          :class="{
            'focus:ring-red-500':
              confirmPassword && password !== confirmPassword,
            'border-red-500': confirmPassword && password !== confirmPassword,
          }"
        />

        <p
          v-if="confirmPassword && password !== confirmPassword"
          class="text-xs text-red-500 mt-1"
        >
          * Passwords do not match
        </p>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full flex justify-center py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:cursor-pointer focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="authStore.loading">Creating account...</span>
          <span v-else>Register</span>
        </button>
      </form>

      <div class="text-center">
        <router-link
          to="/login"
          class="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
        >
          Already have an account? Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>
