import { basePathB , apiVersionB} from "./config";

export function getProductsApi() {
  const url = `${basePathB}/${apiVersionB}/products.json?limit=10&state=0&offset=1`;
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

export function getProductsBsaleApi(id){
  const url = `${basePathB}/${apiVersionB}/products/${id}.json`;
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

  export function addProductApi(product) {
    const url = `${basePathB}/${apiVersionB}/products.json`;
    const token = "9a942100d7571ec0a06041368e02a23173577f9a";
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: token
      },
      body: JSON.stringify(product)
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

  export function updateProductApi(id,data) {
    const url = `${basePathB}/${apiVersionB}/products/${id}.json`;
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

