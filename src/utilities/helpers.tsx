
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