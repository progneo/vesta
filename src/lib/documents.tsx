import CreateDocumentRequest from '@/types/requests/create/CreateDocumentRequest'

const createDocument = async (document: CreateDocumentRequest) => {
  const response = await fetch(`/api/documents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: document.type,
      series: document.series,
      number: document.number
    })
  })

  if (!response.ok) {
    throw new Error('Error creating client')
  }
  return response.json()
}

export { createDocument }
