const baseURL = 'http://localhost:3000/api'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIn0sImlhdCI6MTYzNzMxNzc4NX0.NnrcQaX0qTNnOTVrvQy4PyvRlV0aWOlBhicntSrFjtU'

export const getRequest = async (url: string, params?: any) => {
  let paramURL = new URL(baseURL+url)
  Object.keys(params).forEach(key => paramURL.searchParams.append(key, params[key]))

  let response = await fetch(paramURL, {
    method: 'GET',
    mode: 'cors',
  })

  return await response.json();
}

export const putRequest = async (url: string, body?: object) => {
  let response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  return await response.json();
}
