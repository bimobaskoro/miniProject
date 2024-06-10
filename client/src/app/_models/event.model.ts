// Tipe data yang berakaitan dengan acara

export type TEvent = {
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
  imgSeat: string;
  promo: number;
  desc: string;
  updateAt: Date;
  createdAt: Date;
  EventPrice: TEventPrice[];
};

export type TEventPrice = {
  id: number;
  eventId: number;
  categoryEvent: string;
  price: number;
  qty: number;
};
