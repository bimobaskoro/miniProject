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

  const fetchSeat = async () => {
    try {
      const response = await axiosInstance().get(`/posts/seat/${user.id}`);
      setSeat(response.data.data);
    } catch (error) {
      console.error("Failed to fetch seat data", error);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchSeat();
    }
  }, [user.id]);

  useEffect(() => {
    console.log("====================================");
    console.log(seat, typeof seat);
    console.log("====================================");
  }, [seat]);

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      location: "",
      imgEvent: "",
      date: "",
      startTime: "",
      finishTime: "",
      city: "",
      desc: "",
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
            <form className="max-w-md mx-auto pt-5">
              <div className="h-[80vh] overflow-auto">
                <div className="text-center relative z-0 w-full mb-5 group text-black font-bold text-lg">
                  Upload Your Event
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="title"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Title
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="underline_select" className="sr-only">
                    Select Category
                  </label>
                  <select
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option selected>Choose a Category</option>
                    <option value="concert">Concert</option>
                    <option value="expo">Expo</option>
                    <option value="play">Play</option>
                    <option value="workshop">Workshop</option>
                    <option value="sport">Sport</option>
                  </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="underline_select" className="sr-only">
                    Select Seat
                  </label>
                  <select
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option value="" disabled selected>
                      Choose a Seat
                    </option>
                    {seat.map((e) => (
                      <option key={e.nameSeat} value={e.nameSeat}>
                        {e.nameSeat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="imgEvent">Event Picture</Label>
                    <Input id="imgEvent" type="file" />
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="location"
                    name="location"
                    id="location"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="location"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Location
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="underline_select" className="sr-only">
                    Select City
                  </label>
                  <select
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option selected>Choose a City</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bogor">Bogor</option>
                    <option value="depok">Depok</option>
                    <option value="tangerang">Tangerang</option>
                    <option value="bekasi">Bekasi</option>
                  </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label>
                    Date Event
                    <br />
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <div className="grid-time">
                    <div className="grid-time-item">
                      <label
                        htmlFor="time"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select start time:
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
                          id="startTime"
                          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          min="09:00"
                          max="18:00"
                          value="00:00"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid-time-item">
                      <label
                        htmlFor="time"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select finish time:
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
                          id="finishTime"
                          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          min="09:00"
                          max="18:00"
                          value="00:00"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="desc">Description</Label>
                    <Textarea
                      placeholder="Type your description here"
                      id="desc"
                    />
                  </div>
                </div>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
