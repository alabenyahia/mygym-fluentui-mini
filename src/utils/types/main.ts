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
  registeredDate: string;
  membership: string;
  membershipExpirationDate: string;
  assignedTo: string;
  deletedAt: string;
};

export type AddMembershipDataType = {
  name: string;
  price: number;
  membershipType: 'time' | 'session';
  timeType: 'day' | 'month';
  timeQuantity: number;
  sessionQuantity: number;
  assignedTo: string;
  deletedAt: string;
};