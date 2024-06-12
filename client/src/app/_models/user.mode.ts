export type TUser = {
  id?: number | string;
  fullName: string;
  email?: string;
  userData?: TUserData;
  password?: string;
  type?: string;
};

export type TUserData = {
  id?: number;
  promoId: number;
  point: number;
  referalCode: string;
  yourReferalCode: string;
  expReferalCode: string;
};
