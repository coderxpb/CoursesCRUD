const baseURL = 'http://localhost:3000/api'

export const getRequest = async (url: string) => {
  let response = await fetch(baseURL+url, {
    method: 'GET',
    mode: 'cors',
  })
  return await response.json();
}
