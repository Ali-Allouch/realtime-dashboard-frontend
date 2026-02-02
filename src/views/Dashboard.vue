<script setup lang="ts">
import Header from "../components/Layout/Header.vue";
import Footer from "../components/Layout/Footer.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../stores/authStore";
import socketService from "../services/socketService";

const authStore = useAuthStore();
const metrics = ref({ cpu: "0", freeMem: "0", totalMem: "0" });

onMounted(() => {
  if (authStore.token) {
    socketService.connect(authStore.token);

    socketService.socket?.on("server_metrics", (data) => {
      metrics.value = data;
    });
  }
});

onUnmounted(() => {
  socketService.disconnect();
});
</script>
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />

    <main class="flex-grow p-6 max-w-7xl mx-auto w-full">
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800">System Monitoring</h1>
        <p class="text-gray-500 text-sm">
          Real-time performance metrics from your server.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <span class="text-xs font-bold text-blue-500 uppercase tracking-wider"
            >CPU Usage</span
          >
          <p class="text-4xl font-black text-gray-900 mt-2">
            {{ metrics.cpu }}%
          </p>
          <div class="w-full bg-gray-100 h-2 mt-4 rounded-full overflow-hidden">
            <div
              class="bg-blue-500 h-full transition-all duration-500"
              :style="{ width: metrics.cpu + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>
