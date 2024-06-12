//Untuk tipe data yang berkaitan dengan transaksi

export type TTransaction = {
  id: number;
  buyerId: number;
  buyerDetailId: number;
  eventId: number;
  eventPriceId: number;
  status: string;
  totalQty: number;
  totalPrice: number;
  createdAt: Date;
};
