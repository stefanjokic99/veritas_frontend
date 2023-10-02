export interface EmployeeFromValues {
  Forename: string,
  Surename: string,
  ParentName: string,
  Sex: string,
  Jmbg: string,
}
export interface Employee {
  Forename: string,
  Surename: string,
  ParentName: string,
  Sex: string,
  Jmbg: string,
}

export interface EmployeeRegistrationFormValues {
  forename: string,
  surename: string,
  parentName: string,
  jmbg: string,
  sex: string,
  email: string,
  username: string,
  password: string,
}