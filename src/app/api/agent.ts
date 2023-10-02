import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFromValues } from "../../models/user";
import { Employee, EmployeeFromValues } from "../../models/employee";
import { CourtCase } from "../../models/case";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:58053/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unathorised");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: () => requests.get<User>("/Account"),
  login: (user: UserFromValues) => requests.post<User>("/Account/login", user),
  register: (user: UserFromValues) =>
    requests.post<User>("/Account/register", user),
};
const Employee = {
  createEmployee: (employee: EmployeeFromValues) =>
    requests.post<Employee>("/Proxy/CourtCase/Employee", employee),
};
const CourtCase = {
  list: () => requests.get<CourtCase[]>("/Proxy/CourtCase/Case"),
  create: (courtCase: CourtCase) =>
    requests.post<CourtCase>("/Proxy/CourtCase/Case", courtCase),
};

const agent = {
  Account,
  Employee,
  CourtCase,
};

export default agent;
