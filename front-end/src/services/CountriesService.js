const apiUrl = import.meta.env.VITE_BASE_API_URL;

export async function getAvailableCountries() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: new Headers({ 'Content-type': 'application/json'}),
      mode: 'cors'
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCountryInfo(code) {
  try {
    const response = await fetch(`${apiUrl}/${code}`, {
      method: 'GET',
      headers: new Headers({ 'Content-type': 'application/json'}),
      mode: 'cors'
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}