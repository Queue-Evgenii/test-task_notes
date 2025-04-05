import { Note } from "~/entities/note/model/types"

let notes: Array<Note> = [
  {
    id: 1,
    title: 'First note',
    content: 'This is the first note',
  },
  {
    id: 2,
    title: 'Second note',
    content: 'This is the second note',
  },
]

const getNextId = () => {
  const maxId = notes.reduce((max, note) => (note.id > max ? note.id : max), 0)
  return maxId + 1
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  
  if (method === 'GET') {
    return notes
  }

  if (method === 'POST') {
    const body = await readBody(event)

    const note = notes.find((n) => n.id === body.id)
    if (note) {
      Object.assign(note, body)
      return;
    }

    const newNote = {
      ...body,
      id: getNextId(),
    }

    notes.push(newNote)
    return notes
  }

  if (method === 'DELETE') {
    const query = getQuery(event)
    notes = notes.filter(note => note.id !== parseInt(query.id as string))
    return notes
  }
})
