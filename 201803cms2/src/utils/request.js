import fetch from 'dva/fetch';
const BaseURL = 'http://127.0.0.1:7001';
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  //给options加上这个属性的话才能在跨域的时候向服务器发送cookie 
  options.credentials = 'include';
  let token = window.localStorage.getItem('token');
  if (token) {
    options.headers = options.headers || {};
    options.headers['Authorization'] = token;
  }
  return fetch(`${BaseURL}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => ({ err }));
}
