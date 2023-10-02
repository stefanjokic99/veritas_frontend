export interface CaseType {
  Id: string;
  Name: string;
}
export interface Department {
  Id: string;
  Name: string;
}

export interface ICourtCase {
  Id?: string;
  Name: string;
  Description: string;
  Status: string;
  Type: CaseType;
  Department: Department;
}

export class CourtCase {
  constructor(init?: ICourtCase) {
    Object.assign(this, init);
  }
}
