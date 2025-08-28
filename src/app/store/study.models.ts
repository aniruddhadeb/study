export interface Person {
  id: number;
  name: string;
  age: number;
  address: string;
  sex: string;
  phone: string;
  email: string;
}
export interface PayrollsData {
  month: string;
  basicSalary: number;
  hra: number;
  allowance: number;
  deductions: number;
  netPay: number;
  paymentDate: string;
  paymentMode: string;
  id: string;
}

export interface EmployeesData {
  imageURL: string;
  email: string;
  age: number;
  firstName: string;
  lastName: string;
  contactNumber: number;
  dob: string;
  salary: number;
  address: string;
  id: string;
  tasks?: EmployeeTask[];
  payrolls?: PayrollsData[];
}
export interface EmployeeTask{
  task: string;
}
export interface OrganisationData {
  dob: string
  marriageAnniversary: string
  workAnniversary: string
  joiningDate: string
  id: string
  employeeId: string
}

export interface ExcelRow {
  id?: number;
  [key: string]: any;
}