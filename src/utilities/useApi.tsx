import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalContext";

export function useApi(){
  const context = useGlobalContext();
  const navigate = useNavigate();
  /**  
   * GET method helper
   * @param {string} endpoint - The endpoint that you want to target following the URL e.g posts
   * @param {string} query - If applicable, query strings object that you want to pass, if N/A pass null
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
  /**  
   * POST method helper
   * @param {string} endpoint - The endpoint that you want to target following the URL e.g posts
   * @param {string} obj - The request body json object you want to pass
   **/
  const postToEndpoint = async (endpoint : string, obj : object) : Promise<any> => {
    const url = "http://localhost:3000/" + endpoint;

    const isFormData = obj instanceof FormData;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(!isFormData &&{ 'Content-Type': 'application/json' }),
          ...(context?.jwt && {Authorization: `Bearer ${context.jwt}`})
        },
        body: isFormData ? obj : JSON.stringify(obj)
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
  /**  
   * DELETE method helper
   * @param {string} endpoint - The endpoint that you want to target following the URL e.g posts
   * @param {string} query - If applicable, query strings object that you want to pass, if N/A pass null
   **/
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
