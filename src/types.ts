export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  company: string;
  phoneEnterprise: string;
  role: 'admin' | 'employee' | 'secretary';
}

export interface Employee {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phoneEnterprise: string;
  role: 'admin' | 'employee' | 'secretary';
}

export interface Appointment {
  
  id: number;
  phoneEnterprise: string;
  companyName: string;
  title: string;
  color: string;
  duration: number;
  hours: string;
  date: Date;
  intervenants?: string[];
  clientName?: string;
  address?: string;
  note?: number;
  punctuality?: number;
  friendliness?: number;
  interventionQuality?: number;
  comment?: string;
}

export interface Filter {
  phoneEnterprise: string;
  companyName: string;
  title: string;
  duration: number;
  color: string;
}

export interface Client {
  phoneEnterprise: string;
  companyName: string;
  clientFirstName: string;
  clientLastName: string;
  clientCompany?: string;
  clientPhone: string;
  clientPhone2?: string;
  clientEmail: string;
  clientAddress: string;
  clientDepartment: string;
  clientCity: string;
}

export interface AuthData {
  phoneEnterprise: string;
  companyName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string
  id: number;
}


