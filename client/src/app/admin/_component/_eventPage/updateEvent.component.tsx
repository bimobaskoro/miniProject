"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import React, { useState, ChangeEvent } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "@/app/_lib/axios";
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
import Swal from "sweetalert2";
import { TEvent } from "@/app/_models/event.model";
import Image from "next/image";
import DefaultImg from "@/app/../../public/default.webp";

export default function UpdateEventComponent({
  eventProps,
}: {
  eventProps: TEvent;
}) {
  interface EventPrice {
    categoryEvent: string;
    qty: number;
    price: number;
  }

  const [date, setDate] = React.useState<Date>();

  const defaultDate = eventProps.date;

  const [EventPrices, setEventPrices] = useState<EventPrice[]>([
    { categoryEvent: "", qty: 0, price: 0 },
  ]);

  const formik = useFormik({
    initialValues: { ...eventProps, imgEvent: null, imgSeat: null },
    onSubmit: async (values) => {
      try {
        await axiosInstance().patch(
          "/posts/event/" + eventProps.id,
          {
            ...values,
            EventPrice: EventPrices,
          },
          {
            headers: {
              "Content-Type":
                !values.imgEvent && !values.imgSeat
                  ? "application/json"
                  : "multipart/form-data",
            },
          }
        );

        // console.log("Success", response.data);

        Swal.fire({
          icon: "success",
          text: "Event Updated",
        });
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          text: `Error : ${error}`,
        });
      }
    },
  });

  const [startTime, setStartTime] = useState<string>("00:00");
  const [finishTime, setFinishTime] = useState<string>("00:00");

  const handleStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartTime(event.target.value);
  };

  const handleFinishTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFinishTime(event.target.value);
  };

  const handleEventPriceChange = (
    index: number,
    key: keyof EventPrice,
    value: string | number
  ) => {
    const newEventPrices = [...EventPrices];
    newEventPrices[index] = {
      ...newEventPrices[index],
      [key]: value,
    };
    setEventPrices(newEventPrices);
  };

  const addEventPrice = () => {
    const newEventPrices = [
      ...EventPrices,
      { categoryEvent: "", qty: 0, price: 0 },
    ];
    setEventPrices(newEventPrices);
    formik.setFieldValue("EventPrices", newEventPrices); // update formik values
  };

  const removeEventPrice = (index: number) => {
    const newEventPrice = EventPrices.filter((_, i) => i !== index);
    setEventPrices(newEventPrice);
    formik.setFieldValue("EventPrices", newEventPrice); // update formik values
  };

  return (
    <Dialog>
      <DialogHeader className="bg-white">
        <DialogDescription className="bg-white">
          <div className=" text-[20px] font-bold text-center text-black">
            Edit Your Event
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="grid w-full items-center gap-1.5 h-[80vh] overflow-y-auto p-3"
          >
            {/* image event  */}
            <div className="">
              <div>
                <center>
                  <Label htmlFor="PrevImgEvent">Preview Image Event</Label>
                  <Image
                    src={
                      formik.values.imgEvent
                        ? URL.createObjectURL(formik.values.imgEvent)
                        : eventProps.imgEvent
                        ? "http://localhost:8001/posts/image/" + eventProps.id
                        : DefaultImg
                    }
                    alt=""
                    width={100}
                    height={100}
                  />
                </center>
              </div>

              <Label htmlFor="imgEvent">Image Event</Label>
              <Input
                id="imgEvent"
                type="file"
                accept="image/png"
                onChange={(e) => {
                  const file =
                    e.currentTarget.files && e.currentTarget.files[0];
                  if (file) {
                    formik.setFieldValue("imgEvent", file);
                  }
                }}
              />
            </div>
            {/* title event */}
            <div className="">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                defaultValue={eventProps.title}
                placeholder="Your Title"
                onChange={formik.handleChange}
              />
            </div>
            {/* category event */}
            <div>
              <label
                htmlFor="category"
                defaultValue={eventProps.category}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an category
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={formik.handleChange}
                defaultValue={formik.values.category}
              >
                <option selected>Choose a category</option>
                <option value="Concert">Concert</option>
                <option value="Expo">Expo</option>
                <option value="Play">Play</option>
                <option value="Workshop">Workshop</option>
                <option value="Sport">Sport</option>
              </select>
            </div>
            {/* city event */}
            <div>
              <label
                htmlFor="city"
                defaultValue={eventProps.city}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an city
              </label>
              <select
                id="city"
                defaultValue={formik.values.city}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a city</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Bogor">Bogor</option>
                <option value="Depok">Depok</option>
                <option value="Tangerang">Tangerang</option>
                <option value="Bekasi">Bekasi</option>
              </select>
            </div>
            {/* location event */}
            <div className="">
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                placeholder="Location"
                defaultValue={eventProps.location}
                onChange={formik.handleChange}
              />
            </div>
            {/* date event */}
            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span>
                        Pick a date (Please select a new date to edit)
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      formik.setFieldValue("date", newDate);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* start time event & finish time event */}
            <div className="grid-time">
              {/* start time  */}
              <div className="grid-time-item">
                <label
                  htmlFor="startTime"
                  defaultValue={eventProps.startTime}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Start time:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="Time"
                    id="startTime"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // min="09:00"
                    // max="18:00"
                    value={formik.values.startTime}
                    onChange={(e) =>
                      formik.setFieldValue("startTime", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              {/* finishTime */}
              <div className="grid-time-item">
                <label
                  htmlFor="finishTime"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Finish time:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="time"
                    id="time"
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min="00:00"
                    max="23:59"
                    defaultValue={formik.values.finishTime}
                    onChange={(e) =>
                      formik.setFieldValue("finishTime", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>
            {/* desc event */}
            <div>
              <Label htmlFor="desc">Description</Label>
              <Textarea
                placeholder="Type your description here."
                id="desc"
                defaultValue={eventProps.desc}
                onChange={formik.handleChange}
              />
            </div>
            {/* promo event */}
            <div className="">
              <label
                htmlFor="promo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Promo (optional)
              </label>
              <input
                type="number"
                id="promo"
                defaultValue={eventProps.promo}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1000"
                onChange={formik.handleChange}
                required
              />
            </div>
            {/* image seat */}
            <div>
              <center>
                <Label htmlFor="PrevImgEvent">Preview Image Seat</Label>
                <Image
                  src={
                    formik.values.imgSeat
                      ? URL.createObjectURL(formik.values.imgSeat)
                      : eventProps.imgSeat
                      ? "http://localhost:8001/posts/image/" + eventProps.id
                      : DefaultImg
                  }
                  alt=""
                  width={100}
                  height={100}
                />
              </center>
            </div>
            <div className="">
              <Label htmlFor="imgSeat">Image Seat</Label>
              <Input
                id="imgSeat"
                type="file"
                onChange={(e) => {
                  const file =
                    e.currentTarget.files && e.currentTarget.files[0];
                  if (file) {
                    console.log(file);
                    formik.setFieldValue("imgSeat", file);
                  }
                }}
              />
            </div>
            {/* Event Details */}
            <div>
              <Label>Event Details</Label>
              {formik.values.EventPrice.map((detail, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    type="text"
                    placeholder="Category Event"
                    value={formik.values.EventPrice[index].categoryEvent}
                    onChange={(e) =>
                      handleEventPriceChange(
                        index,
                        "categoryEvent",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={formik.values.EventPrice[index].qty}
                    onChange={(e) =>
                      handleEventPriceChange(
                        index,
                        "qty",
                        Number(e.target.value)
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={formik.values.EventPrice[index].price}
                    onChange={(e) =>
                      handleEventPriceChange(
                        index,
                        "price",
                        Number(e.target.value)
                      )
                    }
                  />
                  <Button type="button" onClick={() => removeEventPrice(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addEventPrice}>
                Add Event Detail
              </Button>
            </div>
            <button type="submit">Upload</button>
          </form>
        </DialogDescription>
      </DialogHeader>
    </Dialog>
  );
}
