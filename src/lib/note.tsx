import CreateNoteRequest from '@/types/requests/create/CreateNoteRequest'

const addNote = async (note: CreateNoteRequest) => {
  const response = await fetch(`/api/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: note.text,
      clientId: note.clientId,
    })
  })

  if (!response.ok) {
    throw new Error('Error creating note')
  }
  return response.status
}

const deleteNoteById = async (id: Number) => {
  const response = await fetch(`/api/notes/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Error deleting note')
  }
  return response.status
}

export { addNote, deleteNoteById }
