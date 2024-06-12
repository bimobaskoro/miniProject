import { TEvent, TEventPrice } from "./event.model";

export type TTransaction = {
  id: number;
  totalQty: number;
  event?: TEvent;
  eventPrice?: TEventPrice;
  totalPrice: number;
  buyerId: number;
  buyerDetailId: number;
  eventId: number;
  eventPriceId: number;
};
