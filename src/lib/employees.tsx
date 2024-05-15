import Employee from '@/types/Employee'

const getSpecialists = async (): Promise<Employee[]> => {
  const response = await fetch(`/api/employees/specialists`)

  if (!response.ok) {
    throw new Error('Error getting specialists')
  }
  return response.json()
}

export { getSpecialists }
