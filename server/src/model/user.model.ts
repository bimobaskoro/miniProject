import type { Type } from "@prisma/client";

export type TAccountData = {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  userDetail?: TUserDetail;
  noPhone: string;
  type: Type;
} | null;

export type TUserDetail = {
  id: number;
  promoId: number;
  point: number;
  referalCode: string;
  yourReferalCode: string;
  expReferalCode: Date;
};
