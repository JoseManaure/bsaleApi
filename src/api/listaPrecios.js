import { basePathB , apiVersionB} from "./config";


export function getProductsApi() {
  const url = `https://api.bsale.cl/v1/variants.json`;
  const token = "9a942100d7571ec0a06041368e02a23173577f9a";

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      access_token: token,
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}
export function getVariantsBsaleApi(id){  
  const url = `https://api.bsale.cl/v1/variants.json`;
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