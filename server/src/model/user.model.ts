import type { Type } from "@prisma/client";

export type TAccountData = {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  noPhone: string;
  type: Type;
};

export type TUserDetail = {
  id: number;
  promoId: number;
  referalCode: string;
  yourReferalCode: string;
  expReferalCode: Date;
};
