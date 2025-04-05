<template>
  <div class="flex flex-col items-center justify-between gap-y-8 min-h-screen py-8">
    <span></span>
    <h1 class="text-4xl font-bold text-center">Hello! <span>&#128522;</span></h1>
    <div class="">
      <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const timeout = ref(undefined);

const toNextRoute = () => {
  if (timeout.value) return;
  setTimeout(() => {
    router.push({ name: 'notes' });
    clearTimeout(timeout.value);
  }, 1000);
};

onMounted(() => {
  toNextRoute();
});
</script>


<style>
</style>