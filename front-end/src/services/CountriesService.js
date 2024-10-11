const apiUrl = 'http://localhost:3000/countries';

export async function getAvailableCountries() {
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: new Headers({ 'Content-type': 'application/json'}),
    mode: 'cors'
  });
  return await response.json();
}

export async function getCountryInfo(code) {
  const response = await fetch(`${apiUrl}/${code}`, {
    method: 'GET',
    headers: new Headers({ 'Content-type': 'application/json'}),
    mode: 'cors'
  });
  return await response.json();
}