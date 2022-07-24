import { basePathB, apiVersionB } from "./config";

export function getVariantsBsaleApi(id){
    const url = `${basePathB}/${apiVersionB}/variant/${id}.json`;
  const token = "9a942100d7571ec0a06041368e02a23173577f9a";
  
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: token,
        }
      };  
      return fetch(url, params)
        .then(async response => {
          return { code: response.status, data: await response.json() };
        })
        .then(result => {
          return result;
        })
        .catch(err => {
          return err;
        });
    }