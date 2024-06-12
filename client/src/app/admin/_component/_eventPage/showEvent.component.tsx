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
import Swal from "sweetalert2";

export default function ShowEventComponent() {
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
    fetchEvents();
  }, [user.id]);

  const deleteEvent = async (id: number) => {
    try {
      const response = await axiosInstance().delete(`/posts/${id}`);

      console.log(response.data);
      Swal.fire({
        title: "Do you want to delete this event?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Delete!", " event ", "success");
          fetchEvents();
        } else if (result.isDenied) {
          Swal.fire("Delete", " cancel ", "info");
        }
      });

      // fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };
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
                <button
                  className="bg-[#DC3545] text-white rounded-sm p-2"
                  onClick={() => deleteEvent(e.id)}
                >
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
