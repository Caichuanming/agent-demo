import type { ID, ISODateTimeString } from "./common";

export type OrderStatus = "created" | "paid" | "shipped" | "completed" | "cancelled";

export interface Order {
  id: ID;
  orderNo: string;
  patientName: string;
  amountCny: number;
  status: OrderStatus;
  createdAt: ISODateTimeString;
}

export type DoctorDepartment =
  | "internal_medicine"
  | "surgery"
  | "pediatrics"
  | "dermatology"
  | "neurology"
  | "general";

export interface Doctor {
  id: ID;
  name: string;
  title: string;
  department: DoctorDepartment;
  hospital: string;
  available: boolean;
}
