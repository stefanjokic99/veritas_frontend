import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFromValues } from "../../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";
import { EmployeeFromValues, EmployeeRegistrationFormValues } from "../../models/employee";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login =async (creds:UserFromValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
      });
      router.navigate("/dashboard");
    }
    catch(error) {
      throw error;
    }
  };

  register =async (creds:EmployeeRegistrationFormValues) => {
    try {
      const user_value = 
      { firstname: creds.forename,
        lastname: creds.surename,
        email: creds.email,
        password: creds.password,
        username: creds.username,
      } as UserFromValues; 
      const user = await agent.Account.register(user_value);
      store.commonStore.setToken(user.token);
      const employee_value = 
      {
        Forename: creds.forename,
        Surename: creds.surename,
        ParentName: creds.parentName,
        Sex: creds.sex,
        Jmbg: creds.jmbg,
      } as EmployeeFromValues;
      runInAction(() => {
        this.user = user;
      });
      await agent.Employee.createEmployee(employee_value);
      router.navigate("/dashboard");
    }
    catch(error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => this.user = user);
    } catch(error) {
      console.log(error);
    }
  }
}