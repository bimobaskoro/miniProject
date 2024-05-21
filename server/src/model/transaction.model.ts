//Untuk tipe data yang berkaitan dengan transaksi

export type TTransaction = {
  id: number;
  eventId: number;
  userId: number;
  seatSelection: string;
  totalSeat: number;
  totalPrice: number;
  updateAt?: Date;
  createdAt?: Date;
};

export type TTicket = {
  transactionId: number;
};

export type TPromo = {
  promoId: number;
};

export type TPostPromo = {
  id: number;
  adminId: number;
  title: string;
  value: number;
  desc: string;
  price: number;
  updateAt?: Date;
  createdAt?: Date;
};
