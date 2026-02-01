<script setup lang="ts">
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("token");
  authStore.$reset();
  router.replace("/login");
};
</script>

<template>
  <nav
    class="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm sticky top-0 z-50"
  >
    <div class="flex items-center gap-2">
      <div
        class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
      >
        <span class="text-white font-bold">R</span>
      </div>
      <span class="text-xl font-bold text-gray-800 tracking-tight"
        >RealTime<span class="text-blue-600">Dash</span></span
      >
    </div>

    <div class="flex items-center gap-6">
      <div class="hidden sm:flex flex-col items-end">
        <span class="text-sm font-semibold text-gray-700 leading-none">{{
          authStore.user?.name || "User"
        }}</span>
        <span class="text-xs text-green-500 font-medium">● Online</span>
      </div>

      <button
        @click="handleLogout"
        class="flex items-center gap-2 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg border border-gray-200 hover:border-red-200 transition-all duration-200 text-sm font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </div>
  </nav>
</template>
