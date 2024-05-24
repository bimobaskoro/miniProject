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
  desc: string;
  updateAt: Date;
  createdAt: Date;
};
