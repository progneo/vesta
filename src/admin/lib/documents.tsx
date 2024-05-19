import Document from '@/admin/types/models/Document'

async function getDocuments(): Promise<Document[]> {
  const response = await fetch('/api/admin/documents')

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

async function putDocument(document: Document): Promise<number> {
  const response = await fetch(`/api/admin/documents/${document.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(document)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

export { getDocuments, putDocument }
