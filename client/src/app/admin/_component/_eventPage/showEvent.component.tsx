"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../hooks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/app/_lib/axios";
import { TEvent } from "@/app/_models/event.model";

export default function ShowEventComponent() {
  const [events, setEvent] = useState<TEvent[]>([]);
  const user = useAppSelector((state) => state.auth);
  useEffect(() => {
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
    fetchEvents();
  }, [user.id]);
  return (
    <>
      <Table>
        <TableCaption>Your Event</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((e, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{e.title}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell>{e.city}</TableCell>
              <TableCell>{e.status}</TableCell>
              <TableCell>
                <button className=" bg-[#198754] text-white rounded-sm p-2 w-[57px]">
                  Edit
                </button>
                <button className="bg-[#DC3545] text-white rounded-sm p-2">
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
