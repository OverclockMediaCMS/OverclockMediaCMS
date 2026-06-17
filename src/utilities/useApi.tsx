import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalContext";

export function useApi(){
  const context = useGlobalContext();
  const navigate = useNavigate();
  /** 
   * pass the endpoint and query otherwise pass null
   **/
  const getFromEndpoint = async (endpoint : string, query : any) : Promise<any> => {
    const url = new URL("http://localhost:3000/" + endpoint);
    if(query !== null){
      url.search = new URLSearchParams(query).toString();
    }
    
    try {
      const response = await fetch(url, {
        headers: {
          ...(context?.jwt && {Authorization: `Bearer ${context.jwt}`})
        }
      });
      if(response.status == 401){
        navigate("/Login");
        return;
      }
      return response;
    } catch (error) {
      console.error("getFromEndPoint error: ", error);
    }
  }
  const postToEndpoint = async (endpoint : string, obj : object) : Promise<any> => {
    const url = "http://localhost:3000/" + endpoint;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(context?.jwt && {Authorization: `Bearer ${context.jwt}`})
        },
        body: JSON.stringify(obj)
      });
      if(response.status == 401){
        navigate("/Login");
        return;
      }
      return response;
    } catch (error) {
      console.error("postToEndPoint error: ", error);
    }
  }

  const deleteFromEndpoint = async (endpoint : string, query : any) : Promise<any> => {
    const url = new URL("http://localhost:3000/" + endpoint);
    if(query !== null){
      url.search = new URLSearchParams(query).toString();
    }

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          ...(context?.jwt && {Authorization: `Bearer ${context.jwt}`})
        }
      });
      if(response.status == 401){
        navigate("/Login");
        return;
      }
      return response;
    } catch (error) {
      console.error("deleteFromEndpoint error: ", error);
    }
  }


  return { getFromEndpoint, postToEndpoint, deleteFromEndpoint };
}
