"use client";
import React, { useEffect, useState } from "react";
import CreateEventComponent from "./createEvent.component";
import ShowEventComponent from "./showEvent.component";
import { TEvent } from "@/app/_models/event.model";
import { axiosInstance } from "@/app/_utils/config";
import { TUser } from "@/app/_models/user.mode";
import { useAppSelector } from "../../../../../hooks";

type Props = {};

export default function EventComponent({}: Props) {
  const [events, setEvent] = useState<TEvent[]>([]);
  const user = useAppSelector((state) => state.auth);

  const fetchEvents = async () => {
    try {
      if (user.id) {
        const response = await axiosInstance().get(`/posts/${user.id}`);
        console.log(response.data);
        setEvent(response.data.events);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(user.id);

    fetchEvents();
  }, [user.id]);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <CreateEventComponent fetch={fetchEvents} />
      </div>
      <div className="p-4 sm:ml-64">
        <ShowEventComponent events={events} fetch={fetchEvents} />
      </div>
    </>
  );
}
