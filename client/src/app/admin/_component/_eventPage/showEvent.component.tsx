"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
<<<<<<< Updated upstream

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
=======
import Swal from "sweetalert2";
import UpdateEventComponent from "./updateEvent.component";
import { TUser } from "@/app/_models/user.mode";

export default function ShowEventComponent({
  events,
  fetch,
}: {
  events: TEvent[];
  fetch: () => void;
}) {
  const deleteEvent = async (id: number) => {
    try {
      Swal.fire({
        title: "Do you want to delete this event?",
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Cancel`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Delete!", " event ", "success");
          axiosInstance().delete(`/posts/${id}`);
          fetch();
        } else if (result.isDenied) {
          Swal.fire("Delete", " cancel ", "info");
        }
      });

      // fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                <button className=" bg-[#198754] text-white rounded-sm p-2 w-[57px]">
                  Edit
                </button>
                <button className="bg-[#DC3545] text-white rounded-sm p-2">
=======
                <Dialog>
                  <DialogTrigger className=" bg-[#198754] text-white rounded-sm p-2 w-[57px]">
                    Edit
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogDescription>
                        <UpdateEventComponent eventProps={e} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <button
                  className="bg-[#DC3545] text-white rounded-sm p-2"
                  onClick={() => deleteEvent(e.id)}
                >
>>>>>>> Stashed changes
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
