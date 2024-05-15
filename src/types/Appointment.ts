import Client from "./Client"
import Service from "./Service"
import Employee from "./Employee"

export default interface Appointment {
  id: number
  datetime: Date
  clientId: number
  employeeId: number
  serviceId: number
  client: Client
  service: Service
  employee: Employee
}