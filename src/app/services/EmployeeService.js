import { postAsync } from "src/app/services/ApiService";

const CREATE_EMPLOYEE_URL = "/api/Proxy/CourtCase/Employee";

const createEmployee = async ({ forename, surename, sex, parentName, jmbg }) => {
  const body = {
    Forename: forename,
    Surename: surename,
    ParentName: parentName,
    Sex: sex,
    Jmbg: jmbg,
  };

  return postAsync(CREATE_EMPLOYEE_URL, body);
};

const EmployeeService = {
  createEmployee,
};

export default EmployeeService;
