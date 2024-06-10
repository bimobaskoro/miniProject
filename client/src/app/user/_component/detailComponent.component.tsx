"use client";

import { axiosInstance } from "@/app/_lib/axios";
import { TEvent } from "@/app/_models/event.model";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailComponent() {
  const [event, setEventData] = useState<TEvent | null>(null);
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
        <div className=" p-2">
          <div className="rounded-[8px] drop-shadow-xl shadow-md p-2 min-h-44">
            {event?.desc}
          </div>
        </div>
      </div>
      <div className="flex justify-between pl-2 pr-2">
        <div className="text-[22px] font-bold">Rp.{lowestPrice}</div>
        <button className="rounded-[8px] bg-[#007BFF] p-2 font-bold text-white">
          Buy Ticket
        </button>
      </div>
    </>
  );
}
