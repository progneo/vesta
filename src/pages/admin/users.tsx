import { useEffect, useState } from 'react'
import {
  Button,
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
import { FiEdit, FiPlus, FiShield } from 'react-icons/fi'
import User from '@/admin/types/models/User'
import {
  changeUserPassword,
  getUsers,
  postUser,
  putUser
} from '@/admin/lib/users'
import CreateUserModal from '@/admin/components/modal/CreateUserModal'
import ChangePasswordModal from '@/admin/components/modal/ChangePasswordModal'
import EditUserModal from '@/admin/components/modal/EditUserModal'

const UsersPage = () => {
  const [userList, setUserList] = useState<User[] | null>(null)
  const [creatingUser, setCreatingUser] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [passwordChangingUser, setPasswordChangingUser] = useState<User | null>(
    null
  )

  function openChangePasswordForm(user: User) {
    setPasswordChangingUser(user)
  }

  function closeChangePasswordForm() {
    setPasswordChangingUser(null)
  }

  function openCreateUserForm() {
    setCreatingUser(true)
  }

  function closeCreateUserForm() {
    setCreatingUser(false)
  }

  function openEditUserForm(user: User) {
    setEditingUser(user)
  }

  function closeEditUserForm() {
    setEditingUser(null)
  }

  async function loadUsers() {
    const userListResponse = await getUsers()
    setUserList(userListResponse)
  }

  async function createUser(user: User) {
    setUserList(null)
    await postUser(user)
    loadUsers()
  }

  async function editUser(user: User) {
    setUserList(null)
    await putUser(user)
    loadUsers()
  }

  async function changePassword(id: number, password: string) {
    setUserList(null)
    await changeUserPassword(id, password)
    loadUsers()
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <>
      <CreateUserModal
        isOpen={creatingUser}
        onClose={closeCreateUserForm}
        onSubmit={createUser}
      />
      <ChangePasswordModal
        isOpen={passwordChangingUser !== null}
        onClose={closeChangePasswordForm}
        user={passwordChangingUser!}
        onSubmit={changePassword}
      />
      <EditUserModal
        isOpen={editingUser !== null}
        onClose={closeEditUserForm}
        user={editingUser!}
        onSubmit={editUser}
      />{' '}
      <HStack justifyContent={'space-between'} alignContent={'center'} p={3}>
        <Text fontSize={'xl'} fontWeight={'semibold'}>
          Список пользователей
        </Text>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="accentGreen"
          onClick={() => openCreateUserForm()}
        >
          Добавить пользователя
        </Button>
      </HStack>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Имя пользователя</Th>
            <Th>Роль</Th>
            <Th>Статус</Th>
            <Th>ID работника</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {userList ? (
            userList.map(user => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.username}</Td>
                <Td>{user.role}</Td>
                <Td>{user.isActive ? 'Активен' : 'Деактивирован'}</Td>
                <Td>{user.employeeId}</Td>
                <Td>
                  <HStack gap={3}>
                    <IconButton
                      aria-label="Редактировать"
                      icon={<FiEdit />}
                      onClick={() => openEditUserForm(user)}
                    />
                    <IconButton
                      aria-label="Смена пароля"
                      icon={<FiShield />}
                      onClick={() => openChangePasswordForm(user)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4} textAlign="center">
                <Spinner size="lg" />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </>
  )
}

export default UsersPage
