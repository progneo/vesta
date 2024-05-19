import { getResponsibles, putResponsible } from '@/admin/lib/responsibles'
import Responsible from '@/admin/types/models/Responsible'
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
import EditResponsibleModal from '@/admin/components/modal/EditResponsibleModal'

const ResponsiblesPage = () => {
  const [responsibleList, setResponsibleList] = useState<Responsible[] | null>(
    null
  )
  const [editingResponsible, setEditingResponsible] =
    useState<Responsible | null>(null)

  async function loadResponsibles() {
    const responsibleListResponse = await getResponsibles()
    setResponsibleList(responsibleListResponse)
  }

  async function editResponsible(responsible: Responsible) {
    setResponsibleList(null)
    await putResponsible(responsible)
    loadResponsibles()
  }

  function openEditForm(responsible: Responsible) {
    setEditingResponsible(responsible)
  }

  function closeEditForm() {
    setEditingResponsible(null)
  }

  useEffect(() => {
    loadResponsibles()
  }, [])

  return (
    <>
      <EditResponsibleModal
        isOpen={editingResponsible !== null}
        onClose={closeEditForm}
        responsible={editingResponsible!}
        onSubmit={editResponsible}
      />
      <HStack justifyContent={'space-between'} alignContent={'center'} p={3}>
        <Text fontSize={'xl'} fontWeight={'semibold'}>
          Список представителей за клиентов
        </Text>
      </HStack>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Фамилия</Th>
            <Th>Имя</Th>
            <Th>Отчество</Th>
            <Th>Тип</Th>
            <Th>Телефон</Th>
            <Th>ID док.</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {responsibleList ? (
            responsibleList.map(responsible => (
              <Tr key={responsible.id}>
                <Td>{responsible.id}</Td>
                <Td>{responsible.lastName}</Td>
                <Td>{responsible.firstName}</Td>
                <Td>{responsible.patronymic}</Td>
                <Td>{responsible.type}</Td>
                <Td>{responsible.phoneNumber}</Td>
                <Td>{responsible.documentId}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<FiEdit />}
                    onClick={() => openEditForm(responsible)}
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

export default ResponsiblesPage
