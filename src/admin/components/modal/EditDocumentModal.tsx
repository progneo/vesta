import { useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack
} from '@chakra-ui/react'
import Document from '@/admin/types/models/Document'

interface DocumentModalProps {
  isOpen: boolean
  onClose: () => void
  document: Document | null
  onSubmit: (document: Document) => void
}

const EditDocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  document,
  onSubmit
}) => {
  const [editingDocument, setEditingDocument] = useState<Document | null>(
    document
  )

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingDocument({
      ...editingDocument,
      [e.target.name]: e.target.value
    } as Document)
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingDocument) {
      onSubmit(editingDocument)
      onClose()
    }
  }

  useEffect(() => {
    setEditingDocument(document)
  }, [document])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование документа</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3}>
            <FormControl>
              <FormLabel>Серия</FormLabel>
              <Input
                name="series"
                value={editingDocument?.series || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Номер</FormLabel>
              <Input
                name="number"
                value={editingDocument?.number || ''}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Тип</FormLabel>
              <Input
                name="type"
                value={editingDocument?.type || ''}
                onChange={handleInputChange}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="accentGreen" onClick={handleFormSubmit}>
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditDocumentModal
