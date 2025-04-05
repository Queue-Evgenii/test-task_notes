<template>
  <div class="p-4 max-w-3xl mx-auto">
    <template v-if="noteStore.notes.length > 0">
      <ul class="space-y-4">
        <li
          v-for="(note, index) in noteStore.notes"
          :key="index"
          class="border rounded-lg shadow-sm bg-white"
        >
          <NoteItem
            :note="note"
            @edit-note-hoisting="editNote"
            @delete-note-hoisting="deleteNote"
          />
        </li>
      </ul>
    </template>

    <template v-else>
      <div class="text-center text-gray-500 mt-8">
        No notes yet. Add your first note ✍️
      </div>
    </template>

    <div class="mt-8 flex justify-center">
      <RouterLink
        :to="{ path: '/notes/0' }"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
      >
        Add Note
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNoteStore } from '~/entities/note/model/store'
import type { Note } from '~/entities/note/model/types';
import NoteItem from '~/entities/note/ui/note-item.vue';

const router = useRouter();
const noteStore = useNoteStore();

onMounted(() => {
  noteStore.fetchNotes()
})

const editNote = (id: string) => {
  router.push({ path: `/notes/${id}` })
}

const deleteNote = (id: string) => {
  noteStore.deleteNote(id)
}
</script>
