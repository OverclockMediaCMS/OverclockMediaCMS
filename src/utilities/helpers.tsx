
export async function getFromEndpoint(endpoint : string) : Promise<any> {
  const url = "http://localhost:3000/" + endpoint;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return null
  }
}

export async function postToEndpoint(endpoint : string, obj : object) : Promise<any> {
  const url = "http://localhost:3000/" + endpoint;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return null
  }
}