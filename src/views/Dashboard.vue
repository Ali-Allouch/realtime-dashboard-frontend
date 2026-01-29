<script setup lang="ts">
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
