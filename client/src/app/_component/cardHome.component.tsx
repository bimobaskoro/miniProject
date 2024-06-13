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
import event from "../admin/event/page";

export default function CardHomeComponent() {
  const [eventData, setEventData] = useState<TEvent[]>([]);
  const router = useRouter(); // Initialize useRouter hook
  const [loading, setLoading] = useState(true); // Add loading state

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
      <div className="grid-event">
        {eventData.map((event) => {
          const lowestPrice = event.EventPrice
            ? Math.min(...event.EventPrice.map((ep) => ep.price))
            : null;

          return (
            <Link
              href={`/user?id=${event.id}`}
              key={event.id}
              className="grid-event-item flex justify-center"
            >
              <div className="bg-white rounded-[8px] card w-[80%] shadow-lg">
                <div className="md:flex">
                  <center className="mb-2 mt-2 lg:px-2">
                    <img
                      src={`http://localhost:8001/posts/image/${event.id}`}
                      className=" h-48 object-contain rounded-[8px] md:aspect-square md:object-contain lg:aspect-square lg:object-contain"
                      alt=""
                    />
                  </center>
                  <div className="card-body py-5 rounded-b-[8px] md:w-[400px] lg:w-[245px] bg-white">
                    <div className="font-bold text-[20px] mb-2 whitespace-nowrap text-title">
                      {event.title}
                    </div>
                    <div className="flex justify-between  text-gray-700 text-[15px] mb-2">
                      <div>{event.date}</div>
                      <div>{event.city}</div>
                    </div>
                    {lowestPrice !== null && (
                      <div className="text-right">Rp.{lowestPrice}</div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
