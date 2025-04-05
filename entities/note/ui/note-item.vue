<template>
  <div class="relative p-4 bg-white rounded-lg shadow-md">
    <div class="max-w-2/3">
      <h2 class="text-xl font-semibold text-gray-800">{{ note.title }}</h2>
      <p class=" text-gray-600 mt-2">{{ note.content }}</p>
    </div>
    <div class="absolute top-2 right-2 flex space-x-4">
      <button 
        @click="emits('editNoteHoisting', note.id)"
        class="edit-btn p-2 bg-gray-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        <span class="material-icon">edit</span>
      </button>
      <button 
        @click="emits('deleteNoteHoisting', note.id)"
        class="delete-btn p-2 bg-gray-500 text-white rounded-full hover:bg-red-900 transition duration-300 ease-in-out"
      >
        <span class="material-icon">delete</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Note } from '../model/types';

const emits = defineEmits(['editNoteHoisting', 'deleteNoteHoisting']);
defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true,
  },
})
</script>

<style scoped>
.material-icon {
  font-family: "Material Icons", sans-serif;
  font-size: 1rem;
  display: block;
  cursor: pointer;
}
</style>