import { getDocuments, putDocument } from '@/admin/lib/documents'
import Document from '@/admin/types/models/Document'
import { useEffect, useState } from 'react'
import {
  HStack,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import EditDocumentModal from '@/admin/components/modal/EditDocumentModal'

const DocumentsPage = () => {
  const [documentList, setDocumentList] = useState<Document[] | null>(null)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)

  async function loadDocuments() {
    const documentListResponse = await getDocuments()
    setDocumentList(documentListResponse)
  }

  async function editDocument(document: Document) {
    setDocumentList(null)
    await putDocument(document)
    loadDocuments()
  }

  function openEditForm(document: Document) {
    setEditingDocument(document)
  }

  function closeEditForm() {
    setEditingDocument(null)
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  return (
    <>
      <EditDocumentModal
        isOpen={editingDocument !== null}
        onClose={closeEditForm}
        document={editingDocument!}
        onSubmit={editDocument}
      />
      <HStack justifyContent={'space-between'} alignContent={'center'} p={3}>
        <Text fontSize={'xl'} fontWeight={'semibold'}>
          Список документов, подтверждающих личность
        </Text>
      </HStack>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Серия</Th>
            <Th>Номер</Th>
            <Th>Тип</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {documentList ? (
            documentList.map(document => (
              <Tr key={document.id}>
                <Td>{document.id}</Td>
                <Td>{document.series}</Td>
                <Td>{document.number}</Td>
                <Td>{document.type}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<FiEdit />}
                    onClick={() => openEditForm(document)}
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5} textAlign="center">
                <Spinner size="lg" />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </>
  )
}

export default DocumentsPage
