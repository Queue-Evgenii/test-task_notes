import { defineStore } from 'pinia'
import { type Note } from './types'

export const useNoteStore = defineStore('note', {
  state: () => ({
    _notes: [] as Array<Note>,
  }),
  getters: {
    notes(): Array<Note> {
      return this._notes
    },
  },
  actions: {
    async fetchNotes() {
      this._notes = await $fetch<Array<Note>>('/api/notes')
    },
    async saveNote(note: Note) {
      this._notes = await $fetch<Array<Note>>('/api/notes', {
        method: 'POST',
        body: note,
      })
    },
    async deleteNote(id: string) {
      this._notes = await $fetch<Array<Note>>(`/api/notes`, {
        method: 'DELETE',
        params: {
          id
        }
      })
    }
  }
})
