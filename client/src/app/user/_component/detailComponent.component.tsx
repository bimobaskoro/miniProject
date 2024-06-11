"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { axiosInstance } from "@/app/_lib/axios";
import { TEvent } from "@/app/_models/event.model";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailComponent() {
  const [event, setEventData] = useState<TEvent | null>(null);
  const [selectedEventPriceId, setSelectedEventPriceId] = useState<
    number | null
  >(null);
  const [quantity, setQuantity] = useState(1);
  const queryParams = useSearchParams();

  useEffect(() => {
    const eventId = queryParams.get("id"); // Get event ID from the query parameters

    const fetchEvent = async () => {
      try {
        const response = await axiosInstance().get(`/posts/event/${eventId}`);

        console.log("====================================");
        console.log("Get Event By ID :", response.data);
        console.log("====================================");

        setEventData(response.data.data);
      } catch (error) {
        console.log("====================================");
        console.log("Error :", error);
        console.log("====================================");
      }
    };
    if (eventId) {
      fetchEvent();
    }
  }, [queryParams.get("id")]);

  const lowestPrice = event
    ? event.EventPrice.reduce(
        (min, ep) => (ep.price < min ? ep.price : min),
        event.EventPrice[0].price
      )
    : null;

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };
  const handleIncrement = () => {
    if (quantity < 3) {
      if (event && selectedEventPriceId !== null) {
        const selectedEventPrice = event.EventPrice.find(
          (ep) => ep.id === selectedEventPriceId
        );
        if (selectedEventPrice) {
          setQuantity((prevQuantity) =>
            Math.min(selectedEventPrice.qty, prevQuantity + 1)
          );
        }
      }
    }
  };

  const handleEventPriceSelect = (eventPriceId: number) => {
    setSelectedEventPriceId(eventPriceId);
    setQuantity(1); // Reset quantity to 1 whenever a new EventPrice type is selected
  };

  return (
    <>
      <img
        src={`http://localhost:8001/posts/image/${event?.id}`} // Menggunakan ID event untuk mengambil gambar
        className="w-full h-48 object-cover rounded-t-[8px]"
        alt=""
      />
      <div className="information">
        <div className="pl-3 font-bold text-[20px]">{event?.title}</div>
        <div className="flex pl-3">
          <div className="">{event?.city}</div>
          <div className="pl-2">{event?.date}</div>
        </div>
        <div className="flex pl-3">
          <div>{event?.startTime}</div>
          <div className="pl-1 pr-1"> - </div>
          <div>{event?.finishTime}</div>
        </div>
        <div className="p-2">
          <div className="rounded-[8px] drop-shadow-xl shadow-md p-2 min-h-44">
            {event?.desc}
          </div>
        </div>
      </div>
      <div className="flex justify-between pl-2 pr-2">
        <div className="text-[22px] font-bold">Rp.{lowestPrice}</div>
        <Dialog>
          <DialogTrigger>
            <button className="rounded-[8px] bg-[#007BFF] p-2 font-bold text-white">
              Buy Ticket
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-[10px]">
            <DialogHeader>
              <DialogTitle>Ticket</DialogTitle>
              <form>
                {event?.EventPrice.map((e) => (
                  <div key={e.id} className="text-left  mb-2">
                    <input
                      type="radio"
                      id={`eventPrice-${e.id}`}
                      name="eventPrice"
                      value={e.id}
                      checked={selectedEventPriceId === e.id}
                      onChange={() => handleEventPriceSelect(e.id)}
                    />
                    <label htmlFor={`eventPrice-${e.id}`} className="ml-2">
                      {e.categoryEvent} - Rp.{e.price}
                    </label>
                    <div className="text-center">
                      Tickets available: {e.qty}
                    </div>
                  </div>
                ))}
                {selectedEventPriceId !== null && (
                  <div className="flex items-center mt-4">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <button className="rounded-[8px] bg-[#007BFF] p-2 font-bold text-white">
                  Buy Ticket
                </button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
