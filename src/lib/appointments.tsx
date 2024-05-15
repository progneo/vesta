import CreateAppointmentRequest from '@/types/requests/create/CreateAppointmentRequest'

const getAppointmentsByDate = async (date: string) => {
  const response = await fetch(`/api/appointments/${date}`)
  if (!response.ok) {
    throw new Error('Error getting appointments')
  }
  return response.json()
}

const getAppointmentsByDateAndEmployeeId = async (
  employeeId: number,
  date: string
) => {
  const response = await fetch(
    `/api/appointments?employeeId=${employeeId}&date=${date}`
  )
  if (!response.ok) {
    throw new Error('Error getting appointments')
  }
  return response.json()
}

const createAppointment = async (appointment: CreateAppointmentRequest) => {
  const response = await fetch(`/api/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      datetime: appointment.datetime,
      clientId: appointment.clientId,
      employeeId: appointment.employeeId,
      serviceId: appointment.serviceId
    })
  })

  if (!response.ok) {
    throw new Error('Error creating appointment')
  }
  return response.status
}

export {
  getAppointmentsByDate,
  getAppointmentsByDateAndEmployeeId,
  createAppointment
}
