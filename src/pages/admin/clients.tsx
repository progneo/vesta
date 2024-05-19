import { getClients, putClient } from '@/admin/lib/clients'
import Client from '@/admin/types/models/Client'
import React, { useEffect, useState } from 'react'
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
import EditClientModal from '@/admin/components/modal/EditClientModal'

const ClientsPage = () => {
  const [clientList, setClientList] = useState<Client[] | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  async function loadClients() {
    const clientListResponse = await getClients()
    setClientList(clientListResponse)
  }

  async function editClient(client: Client) {
    setClientList(null)
    await putClient(client)
    loadClients()
  }

  function openEditForm(client: Client) {
    setEditingClient(client)
  }

  function closeEditForm() {
    setEditingClient(null)
  }

  useEffect(() => {
    loadClients()
  }, [])

  return (
    <>
      <EditClientModal
        isOpen={editingClient !== null}
        onClose={closeEditForm}
        client={editingClient!}
        onSubmit={editClient}
      />
      <HStack justifyContent={'space-between'} alignContent={'center'} p={3}>
        <Text fontSize={'xl'} fontWeight={'semibold'}>
          Список клиентов
        </Text>
      </HStack>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Фамилия</Th>
            <Th>Имя</Th>
            <Th>Отчество</Th>
            <Th>Статус</Th>
            <Th>ID док.</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {clientList ? (
            clientList.map(client => (
              <Tr key={client.id}>
                <Td>{client.id}</Td>
                <Td>{client.lastName}</Td>
                <Td>{client.firstName}</Td>
                <Td>{client.patronymic}</Td>
                <Td>{client.isActive ? 'Активен' : 'Деактивирован'}</Td>
                <Td>{client.documentId}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<FiEdit />}
                    onClick={() => openEditForm(client)}
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

export default ClientsPage
