<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-semibold text-gray-800 text-center pb-4">{{ isEdit ? 'Edit Note' : 'Add Note' }}</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <input v-model="form.title" type="text" placeholder="Title" class="border p-2 rounded" />
      <textarea v-model="form.content" placeholder="Content" class="border p-2 rounded h-40" />

      <button type="submit" class="btn bg-blue-500 text-white px-4 py-2 rounded">
        {{ isEdit ? 'Save' : 'Create' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useNoteStore } from '~/entities/note/model/store'
import { ref, onMounted, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const noteStore = useNoteStore()

const id = parseInt(route.params.id[0])
const isEdit = computed(() => id !== 0)

const form = ref({
  title: '',
  content: ''
})

onMounted(() => {
  if (isEdit.value) {
    const note = noteStore.notes.find(n => n.id === id)
    if (note) {
      form.value = { title: note.title, content: note.content }
    }
  }
})

const handleSubmit = () => {
  noteStore.saveNote({ id, ...form.value })
  router.push({ path: '/notes' })
}
</script>