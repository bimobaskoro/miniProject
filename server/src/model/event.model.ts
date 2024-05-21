// Tipe data yang berakaitan dengan acara

export type TPostEvent = {
  id: number;
  adminId: number;
  title: string;
  status: boolean;
  category: string;
  location: string;
  city: string;
  date: Date;
  startTime: Date;
  finishTime: Date;
  imageEvent: string;
  imageSeat?: string;
  seatType?: string;
  maxSeat?: string;
  price: number;
  desc: string;
  updateAt: Date;
  createdAt: Date;
};

export type TReview = {
  id: number;
  userId: number;
  postId: number;
  start: number;
  desc: string;
  createdAt: Date;
};
