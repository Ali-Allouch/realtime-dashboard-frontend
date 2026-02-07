<script setup lang="ts">
import Header from "../components/Layout/Header.vue";
import Footer from "../components/Layout/Footer.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../stores/authStore";
import socketService from "../services/socketService";
import CPUChart from "../components/CPUChart.vue";

const authStore = useAuthStore();
const metrics = ref({ cpu: "0", freeMem: "0", totalMem: "0" });

const chartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: "CPU Usage %",
      backgroundColor: "#3b82f6",
      borderColor: "#3b82f6",
      data: [] as number[],
      tension: 0.4,
      fill: true,
    },
  ],
});

onMounted(() => {
  if (authStore.token) {
    socketService.connect(authStore.token);

    socketService.socket?.on("server_metrics", (data) => {
      metrics.value = data;

      if (chartData.value.datasets[0]) {
        const newLabels = [...chartData.value.labels, data.timestamp];
        const newData = [...chartData.value.datasets[0].data, Number(data.cpu)];

        if (newLabels.length > 20) {
          newLabels.shift();
          newData.shift();
        }

        chartData.value = {
          ...chartData.value,
          labels: newLabels,
          datasets: [{ ...chartData.value.datasets[0], data: newData }],
        };
      }
    });
  }
});

onUnmounted(() => {
  socketService.disconnect();
});
</script>
<template>
  <div class="min-h-screen flex flex-col bg-[#f8fafc]">
    <Header />

    <main class="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
      <header
        class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
      >
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">
            System Monitoring
          </h1>
          <p class="text-slate-500 font-medium mt-1">
            Real-time performance metrics from your server in Dortmund.
          </p>
        </div>
        <div
          class="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-100 shadow-sm"
        >
          <span class="relative flex h-3 w-3">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
            ></span>
          </span>
          <span class="text-sm font-bold uppercase tracking-wider"
            >System Live</span
          >
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 transition-all hover:shadow-md hover:border-blue-200"
        >
          <div class="flex justify-between items-start mb-4">
            <div
              class="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            <span
              class="text-xs font-bold text-slate-400 uppercase tracking-widest"
              >Processor</span
            >
          </div>
          <h3 class="text-slate-500 text-sm font-bold uppercase tracking-wider">
            CPU Usage
          </h3>
          <div class="flex items-baseline gap-1 mt-2">
            <p class="text-4xl font-black text-slate-900">{{ metrics.cpu }}</p>
            <span class="text-xl font-bold text-slate-400">%</span>
          </div>
          <div
            class="w-full bg-slate-100 h-2.5 mt-6 rounded-full overflow-hidden"
          >
            <div
              class="bg-blue-600 h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)]"
              :style="{ width: metrics.cpu + '%' }"
            ></div>
          </div>
        </div>

        <div
          class="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 transition-all hover:shadow-md hover:border-emerald-200"
        >
          <div class="flex justify-between items-start mb-4">
            <div
              class="p-3 bg-emerald-50 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors text-emerald-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span
              class="text-xs font-bold text-slate-400 uppercase tracking-widest"
              >Memory</span
            >
          </div>
          <h3 class="text-slate-500 text-sm font-bold uppercase tracking-wider">
            Available RAM
          </h3>
          <div class="flex items-baseline gap-1 mt-2">
            <p class="text-4xl font-black text-slate-900">
              {{ metrics.freeMem }}
            </p>
            <span class="text-xl font-bold text-slate-400">GB</span>
          </div>
          <p class="text-xs text-slate-400 font-medium mt-1">
            Total installed: {{ metrics.totalMem }} GB
          </p>
          <div
            class="w-full bg-slate-100 h-2.5 mt-4 rounded-full overflow-hidden"
          >
            <div
              class="bg-emerald-500 h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              :style="{
                width:
                  (Number(metrics.freeMem) / Number(metrics.totalMem)) * 100 +
                  '%',
              }"
            ></div>
          </div>
        </div>

        <div
          class="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 transition-all hover:shadow-md hover:border-indigo-200"
        >
          <div class="flex justify-between items-start mb-4">
            <div
              class="p-3 bg-indigo-50 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors text-indigo-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span
              class="text-xs font-bold text-slate-400 uppercase tracking-widest"
              >Network</span
            >
          </div>
          <h3 class="text-slate-500 text-sm font-bold uppercase tracking-wider">
            Status
          </h3>
          <div class="mt-2">
            <span
              class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold bg-slate-100 text-slate-700"
            >
              Connection Stable
            </span>
          </div>
          <p class="text-xs text-slate-400 font-medium mt-4">
            Active Socket: {{ socketService.socket?.id || "Pending..." }}
          </p>
        </div>
      </div>

      <section
        class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden"
      >
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h3 class="text-xl font-black text-slate-900 tracking-tight">
              CPU Performance History
            </h3>
            <p class="text-slate-400 text-sm font-medium">
              Monitoring fluctuating load cycles
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-blue-600 rounded-full"></span>
            <span
              class="text-xs font-black text-slate-500 uppercase tracking-tighter"
              >Live Dataset</span
            >
          </div>
        </div>

        <div class="w-full">
          <CPUChart :chartData="chartData" />
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
