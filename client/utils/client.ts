import axios, { AxiosInstance, AxiosResponse } from 'axios';

class Client {
  private static _axios: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 3000,
  });

  static get(path: string, payload: Object = {}): Promise<AxiosResponse> {
    return new Promise((res, rej) => {
      this._axios
        .get(path, payload)
        .then((response: AxiosResponse) => res(response))
        .catch((err) => rej(err));
    });
  }

  static post(path: string, payload: Object = {}): Promise<AxiosResponse> {
    return new Promise((res, rej) => {
      this._axios
        .post(path, payload)
        .then((response: AxiosResponse) => res(response))
        .catch((err) => rej(err));
    });
  }

  static patch(path: string, payload: Object = {}): Promise<AxiosResponse> {
    return new Promise((res, rej) => {
      this._axios
        .patch(path, payload)
        .then((response: AxiosResponse) => res(response))
        .catch((err) => rej(err));
    });
  }

  static put(path: string, payload: Object = {}): Promise<AxiosResponse> {
    return new Promise((res, rej) => {
      this._axios
        .put(path, payload)
        .then((response: AxiosResponse) => res(response))
        .catch((err) => rej(err));
    });
  }

  static authHeaderSetup(access_token: string) {
    this._axios.defaults.headers.common['token'] = access_token;
  }
}

export default Client;
