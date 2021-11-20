const baseURL = 'http://localhost:3000/api';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIn0sImlhdCI6MTYzNzMxNzc4NX0.NnrcQaX0qTNnOTVrvQy4PyvRlV0aWOlBhicntSrFjtU';

type authorizedMethod = 'PUT' | 'DELETE' | 'POST';

export const getRequest = async (url: string, params?: any) => {
  let paramURL = new URL(baseURL + url);
  if (params) {
    Object.keys(params).forEach(key =>
      paramURL.searchParams.append(key, params[key]),
    );
  }

  let response = await fetch(paramURL.toString(), {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
  });

  return await response.json();
};

const authorizedRequests = async (
  url: string,
  method: authorizedMethod,
  body?: object,
) => {
  console.log(body);
  console.log(JSON.stringify(body));
  let response = await fetch(baseURL + url, {
    method,
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const postRequest = async (url: string, body?: object) =>
  authorizedRequests(url, 'POST', body);

export const putRequest = async (url: string, body?: object) =>
  authorizedRequests(url, 'PUT', body);

export const deleteRequest = async (url: string, body?: object) =>
  authorizedRequests(url, 'DELETE', body);
