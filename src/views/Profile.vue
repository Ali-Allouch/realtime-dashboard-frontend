<script setup lang="ts">
import { ref, reactive } from "vue";
import { useAuthStore } from "../stores/authStore";
import Header from "../components/Layout/Header.vue";
import Footer from "../components/Layout/Footer.vue";

const authStore = useAuthStore();
const isEditing = ref(false);
const newName = ref(authStore.user?.name || "");
const showPasswordForm = ref(false);
const passwordData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const successMsg = ref("");

const handleSave = async () => {
  if (newName.value.trim() === "") return;

  const result = await authStore.updateProfile(newName.value);

  if (result.success) {
    isEditing.value = false;
  }
};

const handleCancel = () => {
  newName.value = authStore.user?.name || "";
  isEditing.value = false;
};

const handleChangePassword = async () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    authStore.errorMessage = "New passwords do not match!";
    return;
  }

  const result = await authStore.changePassword({
    currentPassword: passwordData.currentPassword,
    newPassword: passwordData.newPassword,
  });

  if (result.success) {
    successMsg.value = "Password updated successfully!";
    showPasswordForm.value = false;
    passwordData.currentPassword =
      passwordData.newPassword =
      passwordData.confirmPassword =
        "";
    setTimeout(() => (successMsg.value = ""), 3000);
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f8fafc]">
    <Header />

    <main class="flex-grow p-4 md:p-8 max-w-4xl mx-auto w-full">
      <header class="mb-10">
        <h1 class="text-3xl font-black text-slate-900 tracking-tight">
          Account Settings
        </h1>
        <p class="text-slate-500 font-medium mt-1">
          Manage your personal information.
        </p>
      </header>

      <div
        class="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden"
      >
        <!-- Profile Header Area -->
        <div class="bg-slate-900 h-32 relative">
          <div class="absolute -bottom-12 left-10">
            <div
              class="w-24 h-24 bg-blue-600 rounded-3xl border-4 border-white flex items-center justify-center text-white text-3xl font-black shadow-lg uppercase"
            >
              {{ authStore.user?.name.charAt(0) }}
            </div>
          </div>
        </div>

        <div class="pt-16 pb-10 px-10">
          <div class="flex justify-between items-start mb-10">
            <div v-if="!isEditing" class="flex-grow">
              <h2 class="text-2xl font-black text-slate-900">
                {{ authStore.user?.name }}
              </h2>
              <p class="text-slate-500 font-medium">
                {{ authStore.user?.role }}
              </p>
            </div>

            <div v-else class="flex-grow max-w-md">
              <input
                v-model="newName"
                type="text"
                class="w-full px-4 py-3 border border-blue-200 rounded-xl font-bold text-xl mb-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                :disabled="authStore.loading"
              />
              <div class="flex gap-2">
                <button
                  @click="handleSave"
                  class="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  :disabled="authStore.loading"
                >
                  {{ authStore.loading ? "Saving..." : "Save" }}
                </button>
                <button
                  @click="handleCancel"
                  class="bg-slate-100 text-slate-700 px-5 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                  :disabled="authStore.loading"
                >
                  Cancel
                </button>
              </div>
              <p
                v-if="authStore.errorMessage"
                class="text-red-500 text-sm mt-2"
              >
                {{ authStore.errorMessage }}
              </p>
            </div>

            <button
              v-if="!isEditing"
              @click="isEditing = true"
              class="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Edit Profile
            </button>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-10"
          >
            <div>
              <label
                class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2"
                >Email Address</label
              >
              <p
                class="text-slate-900 font-bold bg-slate-50 p-4 rounded-xl border border-slate-100"
              >
                {{ authStore.user?.email }}
              </p>
              <p class="text-xs text-slate-400 mt-2">
                * Email cannot be changed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section
        class="mt-8 bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden"
      >
        <div class="p-10">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-xl font-black text-slate-900 tracking-tight">
                Security
              </h3>
              <p class="text-slate-500 text-sm font-medium">
                Manage your password and account access.
              </p>
            </div>
            <button
              @click="showPasswordForm = !showPasswordForm"
              class="text-blue-600 font-bold text-sm hover:underline cursor-pointer"
            >
              {{ showPasswordForm ? "Cancel" : "Change Password" }}
            </button>
          </div>

          <p
            v-if="successMsg"
            class="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-bold border border-green-100"
          >
            {{ successMsg }}
          </p>

          <div
            v-if="showPasswordForm"
            class="space-y-4 max-w-md animate-fade-in"
          >
            <input
              v-model="passwordData.currentPassword"
              type="password"
              placeholder="Current Password"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />
            <input
              v-model="passwordData.newPassword"
              type="password"
              placeholder="New Password"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />
            <input
              v-model="passwordData.confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />

            <button
              @click="handleChangePassword"
              class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 cursor-pointer"
              :disabled="authStore.loading"
            >
              {{ authStore.loading ? "Updating..." : "Update Password" }}
            </button>
            <p
              v-if="authStore.errorMessage"
              class="text-red-500 text-xs font-bold"
            >
              {{ authStore.errorMessage }}
            </p>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
