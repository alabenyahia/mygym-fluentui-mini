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
  membershipId: string;
  membershipExpirationDate: string;
  assignedTo: string;
  deletedAt: string;
};