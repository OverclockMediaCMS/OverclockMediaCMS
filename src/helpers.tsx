/** 
 * pass the endpoint and query otherwise pass null
 **/
export async function getFromEndpoint(endpoint : string, query : any) : Promise<any> {
  const url = new URL("http://localhost:3000/" + endpoint);
  if(query !== null){
    url.search = new URLSearchParams(query).toString();
  }
  try {
    const response = await fetch(url);
    return response;
  } catch (error) {
    console.error("getFromEndPoint error: ", error);
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
    return response;
  } catch (error) {
    console.error("postToEndPoint error: ", error);
  }
}