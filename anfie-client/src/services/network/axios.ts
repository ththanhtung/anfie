import { LocalKey } from "@/constants";
import {
  deleteCookieValue,
  getCookieValue,
  localStorageService,
} from "@/utils";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import queryString from "query-string";

interface IOptions {
  timeout: number;
  language: "en" | "vi";
}

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  isRefreshing = false;

  constructor(baseURL?: string, options = {} as IOptions) {
    this.instance = axios.create({
      baseURL: baseURL || process.env.NEXT_PUBLIC_ENDPOINT_API_LOCAL,
      paramsSerializer: this.getRequestParams,
      timeout: options.timeout || 60000,
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });
    this.requestInterceptor();
    this.responseInterceptor();
  }
  private getRequestParams(params = {}) {
    return queryString.stringify(params);
  }

  private requestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  }
  private responseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }
  private _handleResponse(response: AxiosResponse) {
    return response;
  }
  private _handleError = async (error: AxiosError) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;
    if (status === 401) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        const newToken = await this._handleRefreshToken();
        if (newToken) {
          this.isRefreshing = false;
          const accessToken = newToken?.accessToken;
          if (!!accessToken) {
            localStorage.setItem(
              LocalKey.ACCESS_TOKEN_LOCALKEY,
              JSON.stringify(accessToken)
            );
          }
        }
      }
      const retryOrigReq = new Promise((resolve, reject) => {
        const newToken = localStorage.getItem(LocalKey.ACCESS_TOKEN_LOCALKEY);
        if (originalRequest?.headers) {
          originalRequest.headers["Authorization"] = "Bearer " + newToken;
          resolve(axios(originalRequest));
        }
      });
      return retryOrigReq;
    }
    if (status === 500) {
      localStorage.removeItem(LocalKey.ACCESS_TOKEN_LOCALKEY);
      deleteCookieValue({ name: LocalKey.JWT_AUTHORIZATION });
    }
    return Promise.reject(error);
  };
  private _handleRequest(
    config: InternalAxiosRequestConfig<AxiosRequestConfig>
  ) {
    let accessToken = localStorageService.getLocalStorage(
      LocalKey.ACCESS_TOKEN_LOCALKEY
    );

    if (accessToken) {
      (
        config.headers as AxiosRequestHeaders
      ).Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }

  _handleRefreshToken = async () => {
    const refreshToken = getCookieValue({
      name: LocalKey.JWT_AUTHORIZATION,
    });
    try {
      const response = await this.instance.post(
        `/api/auth/refresh-token`,
        { token: refreshToken },
        { headers: { Authorization: "" } }
      );
      const data = response?.data?.data?.result[0];
      return data;
    } catch (e) {
      localStorage.removeItem(LocalKey.ACCESS_TOKEN_LOCALKEY);
      deleteCookieValue({
        name: LocalKey.JWT_AUTHORIZATION,
      });
    }
  };

  public postForm = <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ) => {
    return this.instance.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}
