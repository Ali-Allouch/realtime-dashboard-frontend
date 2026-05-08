<script setup lang="ts">
defineProps<{
  alerts: any[];
}>();

const emit = defineEmits(["close"]);
</script>

<template>
  <div class="fixed bottom-10 right-10 z-[100] flex flex-col gap-3 w-80">
    <transition-group name="list">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        class="bg-white border-l-4 border-red-600 p-4 rounded-xl shadow-2xl flex items-start gap-3 animate-slide-in"
      >
        <div class="p-2 bg-red-100 text-red-600 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="flex-grow">
          <h4 class="text-sm font-black text-slate-900">
            {{ alert.title }}
          </h4>
          <p class="text-xs text-slate-500 font-medium">
            {{ alert.message }}
          </p>
        </div>
        <button
          @click="emit('close', alert.id)"
          class="text-slate-300 hover:text-slate-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>
