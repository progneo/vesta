import { getEmployees, postEmployee, putEmployee } from '@/admin/lib/employees'
import Employee from '@/admin/types/models/Employee'
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
import { FiEdit, FiPlus } from 'react-icons/fi'
import EditEmployeeModal from '@/admin/components/modal/EditEmployeeModal'
import CreateEmployeeModal from '@/admin/components/modal/CreateEmployeeModal'

const EmployeesPage = () => {
  const [employeeList, setEmployeeList] = useState<Employee[] | null>(null)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  async function loadEmployees() {
    const employeeListResponse = await getEmployees()
    setEmployeeList(employeeListResponse)
  }

  async function editEmployee(employee: Employee) {
    setEmployeeList(null)
    await putEmployee(employee)
    loadEmployees()
  }

  async function createEmployee(employee: Employee) {
    setEmployeeList(null)
    await postEmployee(employee)
    loadEmployees()
  }

  function openEditForm(employee: Employee) {
    setEditingEmployee(employee)
  }

  function closeEditForm() {
    setEditingEmployee(null)
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  return (
    <>
      <EditEmployeeModal
        isOpen={editingEmployee !== null}
        onClose={closeEditForm}
        employee={editingEmployee!}
        onSubmit={editEmployee}
      />
      <CreateEmployeeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createEmployee}
      />
      <HStack justifyContent={'space-between'} alignContent={'center'} p={3}>
        <Text fontSize={'xl'} fontWeight={'semibold'}>
          Список работников
        </Text>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="accentGreen"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Добавить работника
        </Button>
      </HStack>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Фамилия</Th>
            <Th>Имя</Th>
            <Th>Отчество</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {employeeList ? (
            employeeList.map(employee => (
              <Tr key={employee.id}>
                <Td>{employee.id}</Td>
                <Td>{employee.lastName}</Td>
                <Td>{employee.firstName}</Td>
                <Td>{employee.patronymic}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<FiEdit />}
                    onClick={() => openEditForm(employee)}
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

export default EmployeesPage
