import Employee from '@/admin/types/models/Employee'

async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(`/api/admin/employee`)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json()
}

async function putEmployee(employee: Employee): Promise<number> {
  const response = await fetch(`/api/admin/employee/${employee.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

async function postEmployee(employee: Employee): Promise<number> {
  const response = await fetch(`/api/admin/employee/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.status
}

export { getEmployees, putEmployee, postEmployee }
