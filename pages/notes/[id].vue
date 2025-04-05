<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-semibold text-gray-800 text-center pb-4">{{ isEdit ? 'Edit Note' : 'Add Note' }}</h1>

    <form @submit.prevent="handleSubmitForm" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <input 
          v-model="title" 
          v-bind="titleProps"
          type="text" 
          placeholder="Title" 
          class="border p-2 rounded" 
        />
        <span v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</span>
      </div>
      
      <div class="flex flex-col gap-2">
        <textarea 
          v-model="content" 
          v-bind="contentProps"
          placeholder="Content" 
          class="border p-2 rounded h-40"
        />
        <span v-if="errors.content" class="text-red-500 text-sm">{{ errors.content }}</span>
      </div>

      <button type="submit" class="btn bg-blue-500 text-white px-4 py-2 rounded">
        {{ isEdit ? 'Save' : 'Create' }}
      </button>
    </form>
  </div>
</template>


<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useNoteStore } from '~/entities/note/model/store'
import { computed, onMounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

const route = useRoute()
const router = useRouter()
const noteStore = useNoteStore()

const id = parseInt(route.params.id[0])
const isEdit = computed(() => id !== 0)

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
      content: yup.string().required('Content is required').min(5, 'Content must be at least 5 characters').max(1000, 'Content must be less than 1000 characters'),
    }),
  ),
});

const [title, titleProps] = defineField('title')
const [content, contentProps] = defineField('content')

onMounted(() => {
  if (isEdit.value) {
    const note = noteStore.notes.find(n => n.id === id)
    if (note) {
      title.value = note.title
      content.value = note.content
    }
  }
})

const submitForm = (values: any) => {
  noteStore.saveNote({ id, ...values })
  router.push({ path: '/notes' })
}

const handleSubmitForm = handleSubmit(submitForm)
</script>
