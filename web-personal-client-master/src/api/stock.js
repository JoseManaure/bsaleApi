import { basePathB , apiVersionB} from "./config";

export function getStocksApi() {
  const url = `${basePathB}/${apiVersionB}/price_lists/3/details.json?expand=[variant]`;
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


export function getStocksBsaleApi(id){
  const url = `${basePathB}/${apiVersionB}/price_lists/3/details/${id}.json`;
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
  export function addStockApi(stock) {
    const url = `${basePathB}/${apiVersionB}/stocks.json`;
    const token = "9a942100d7571ec0a06041368e02a23173577f9a";
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: token
      },
      body: JSON.stringify(stock)
    };
    return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return  result;
      
    })
    .catch(err => {
      return err;
    });
  }
  export function deleteProductApi(id) {
    const url = `${basePathB}/${apiVersionB}/products/${id}.json`;
    const token = "9a942100d7571ec0a06041368e02a23173577f9a";
    
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token: token
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

  export function updateStockApi(id,data) {
    const url = `${basePathB}/${apiVersionB}/stocks/${id}.json`;
    const token = "9a942100d7571ec0a06041368e02a23173577f9a";
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: token
      },
      body: JSON.stringify(data)
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

