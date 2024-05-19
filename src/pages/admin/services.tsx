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
import Service from '@/admin/types/models/Service'
import { getServices, postService, putService } from '@/admin/lib/services'
import CreateServiceModal from '@/admin/components/modal/CreateServiceModal'
import EditServiceModal from '@/admin/components/modal/EditServiceModal'

const ServicesPage = () => {
  const [serviceList, setServiceList] = useState<Service[] | null>(null)
  const [creatingService, setCreatingService] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  function openCreateServiceForm() {
    setCreatingService(true)
  }

  function closeCreateServiceForm() {
    setCreatingService(false)
  }

  function openEditServiceForm(service: Service) {
    setEditingService(service)
  }

  function closeEditServiceForm() {
    setEditingService(null)
  }

  async function loadServices() {
    const serviceListResponse = await getServices()
    setServiceList(serviceListResponse)
  }

  async function createService(service: Service) {
    setServiceList(null)
    await postService(service)
    loadServices()
  }

  async function editService(service: Service) {
    setServiceList(null)
    await putService(service)
    loadServices()
  }

  useEffect(() => {
    loadServices()
  }, [])

  return (
    <>
      <CreateServiceModal
        isOpen={creatingService}
        onClose={closeCreateServiceForm}
        onSubmit={createService}
      />
      <EditServiceModal
        isOpen={editingService !== null}
        onClose={closeEditServiceForm}
        service={editingService!}
        onSubmit={editService}
      />

      <HStack justifyContent={'space-between'} alignContent={'center'} p={3}>
        <Text fontSize={'xl'} fontWeight={'semibold'}>
          Список услуг
        </Text>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="accentGreen"
          onClick={() => openCreateServiceForm()}
        >
          Добавить услугу
        </Button>
      </HStack>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Название</Th>
            <Th>Длительность</Th>
            <Th>Статус</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {serviceList ? (
            serviceList.map(service => (
              <Tr key={service.id}>
                <Td>{service.id}</Td>
                <Td>{service.name}</Td>
                <Td>{service.duration}</Td>
                <Td>{service.isActive ? 'Активна' : 'Деактивирована'}</Td>
                <Td>
                  <IconButton
                    aria-label="Редактировать"
                    icon={<FiEdit />}
                    onClick={() => openEditServiceForm(service)}
                  />
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

export default ServicesPage
