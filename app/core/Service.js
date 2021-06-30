class Service {

  /**
   * 
   * @param {String} urlWithParams 
   */
  static async get(urlWithParams) {
    return await (await fetch(urlWithParams)).json();
  }

  /**
   * 
   * @param {String} url 
   * @param {*} body 
   * @param {*} config 
   */
  static async post(url, body, config) {
    let fetchResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...config
    });
    return await fetchResponse.json();
  }
}

export default Service;