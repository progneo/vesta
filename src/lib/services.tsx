import Service from "@/types/Service"

const getServices = async (): Promise<Service[]> => {
  const response = await fetch(`/api/services`)

  if (!response.ok) {
    throw new Error('Error getting services')
  }
  return response.json()
}

export { getServices }
