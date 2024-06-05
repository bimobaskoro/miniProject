"use client";
import { useAppSelector } from "../../../../hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { axiosInstance } from "@/app/_utils/config";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
interface ISeat {
  nameSeat: string;
}

export default function EventComponent() {
  const [seat, setSeat] = useState<ISeat[]>([]);
  const [date, setDate] = React.useState<Date>();
  const user = useAppSelector((state) => state.auth);
  const route = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      location: "",
      imgEvent: "",
      imgSeat: "",
      date: "",
      promo: "",
      startTime: "",
      finishTime: "",
      city: "",
      desc: "",
      categoryEvent: "",
      qty: "",
      price: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance().post("/post/event", values);
        console.log("====================================");
        console.log("Success", response.data);
        console.log("====================================");
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-[#F9FAFB] rounded-lg font-bold">
        Create Event
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="overflow-y-auto ">
            <div className=" text-[20px] font-bold"> Your Event</div>
            <form
              onChange={formik.handleSubmit}
              className="grid w-full items-center gap-1.5"
            >
              <div className="">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
