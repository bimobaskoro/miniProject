// Tipe data yang berakaitan dengan acara

export type TPostEvent = {
  id: number;
  adminId: number;
  title: string;
  status: boolean;
  category: string;
  location: string;
  city: string;
  date: string;
  startTime: string;
  finishTime: string;
  imgEvent: string;
  promo: number;
  imgSeat: string;
  desc: string;
  updateAt: Date;
  createdAt: Date;
};

export type TEventDetail = {
  id: number;
  categoryEvent: string;
  price: number;
  qty: number;
};
