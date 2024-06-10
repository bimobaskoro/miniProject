"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TEvent, TEventPrice } from "../_models/event.model";
import { axiosInstance } from "../_lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter hook

export default function CardHomeComponent() {
  const [eventData, setEventData] = useState<TEvent[]>([]);
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosInstance().get("/posts/");
        console.log("====================================");
        console.log("Response Data:", response.data.events);
        console.log("====================================");

        setEventData(response.data.events);
      } catch (error) {
        console.log("====================================");
        console.log("Error : ", error);
        console.log("====================================");
      }
    };
    fetchEvent();
  }, []);

  return (
    <>
      <div className="p-2">
        {eventData.map((event) => {
          const lowestPrice = event.EventPrice
            ? Math.min(...event.EventPrice.map((ep) => ep.price))
            : null;

          return (
            <Link href={`/user?id=${event.id}`} key={event.id}>
              <div
                className="card bg-white rounded-[8px] shadow-md"
                key={event.id}
              >
                <center>
                  <img
                    src={`http://localhost:8001/posts/image/${event.id}`} // Menggunakan ID event untuk mengambil gambar
                    className="w-full h-48 object-cover rounded-[8px]"
                    alt=""
                  />
                </center>
                <div className="card-body">
                  <div className="font-bold pt-4 pl-3 text-[20px]">
                    {event.title}
                  </div>
                  <div className="flex text-gray-700 text-[15px]">
                    <div className="pl-3">{event.date}</div>
                    <div className="pl-3">{event.city}</div>
                  </div>
                  {lowestPrice !== null && (
                    <div className="text-right pr-3">Rp.{lowestPrice}</div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
