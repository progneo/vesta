import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import { Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { addNote } from '@/lib/note'
import CreateNoteRequest from '@/types/requests/create/CreateNoteRequest'

interface CreateNoteProps {
  clientId: number
  isOpen: boolean
  onSubmit: () => void
  onClose: () => void
}

const FormSchema = z.object({
  note: z.string().min(1, 'Note is required')
})

function CreateNoteModal({
  clientId,
  isOpen,
  onClose,
  onSubmit
}: CreateNoteProps) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      note: ''
    }
  })
  type FormSchema = z.infer<typeof FormSchema>

  useEffect(() => {
    setFocus('note')
  }, [setFocus])

  const onFormSubmit: SubmitHandler<FormSchema> = async data => {
    const newNote: CreateNoteRequest = {
      text: data.note,
      clientId: clientId
    }

    await addNote(newNote).then(status => {
      if (status === 204) {
        onSubmit()
        onClose()
      }
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <ModalHeader>Добавление заметки</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="text">
              <FormLabel>Текст:</FormLabel>
              <Textarea
                {...register('note')}
                isInvalid={!!errors.note}
                errorBorderColor="red.300"
                id="text"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={'accentGreen'}
              ml={3}
              isLoading={isSubmitting}
              type="submit"
            >
              Добавить
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default CreateNoteModal
