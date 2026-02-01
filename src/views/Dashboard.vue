<script setup lang="ts">
import Header from "../components/Layout/Header.vue";
import Footer from "../components/Layout/Footer.vue";
import { onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../stores/authStore";
import socketService from "../services/socketService";

const authStore = useAuthStore();

onMounted(() => {
  if (authStore.token) {
    socketService.connect(authStore.token);
  }
});

onUnmounted(() => {
  socketService.disconnect();
});
</script>
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <Footer />
  </div>
</template>
