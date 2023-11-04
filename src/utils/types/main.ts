import { Moment } from "moment";

export type RegisterDataType = {
  name: string;
  gymName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type AddMemberDataType = {
  name: string;
  email: string;
  phone: string;
  registeredDate: Date | Moment | "";
  membership: string;
  membershipExpirationDate: Date | Moment | "";
  assignedTo: string;
  deletedAt: Date | Moment | "";
};

export type AddMembershipDataType = {
  name: string;
  price: number;
  membershipType: "time" | "session";
  timeType: "day" | "month";
  timeQuantity: number;
  sessionQuantity: number;
  assignedTo: string;
  deletedAt: Date | Moment | "";
};

export type AddProgramDataType = {
  name: string;
};

export enum recurrentDaysEnum {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export type AddClassDataType = {
  program: string;
  classType: "recurrent" | "one-time";
  startDate: Date | Moment | "";
  endDate: Date | Moment | "";
  startTime: Date | Moment | "";
  endTime: Date | Moment | "";
  recurrentDays: recurrentDaysEnum[];
  classLimit: number;
  assignedTo: string;
  deletedAt: Date | Moment | "";
};

export type AddGymStaffDataType = {
  name: string;
  email: string;
  phone: string;
  role: "manager" | "receptionist";
  assignedTo: string;
  deletedAt: Date | Moment | "";
};

export type AddCoachDataType = {
  name: string;
  email: string;
  phone: string;
  program: string;
  assignedTo: string;
  deletedAt: Date | Moment | "";
};

export type AddDiscountCodeDataType = {
  code: string;
  expires: boolean;
  validFrom: Date | Moment | "";
  validUntil: Date | Moment | "";
  assignedTo: string;
  deletedAt: Date | Moment | "";
};

export type AddTransactionDataType = {
  member: string;
  membership: string;
  price: number;
  isPaid: boolean;
  from: Date | Moment | "";
  to: Date | Moment | "";
  assignedTo: string;
  deletedAt: Date | Moment | "";
};
