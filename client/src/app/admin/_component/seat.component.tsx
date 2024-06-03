"use client";
import { useState } from "react";
import { useAppSelector } from "../../../../hooks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { axiosInstance } from "@/app/_utils/config";

export default function SeatComponent() {
  const [inputCount, setInputCount] = useState<number>(0);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      nameSeat: "",
      imgSeat: null,
      seatType: "",
      maxSeat: "",
      price: "",
      promo: "",
      pricePromo: "",
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("nameSeat", values.nameSeat);
        if (values.imgSeat) {
          formData.append("imgSeat", values.imgSeat);
        }
        formData.append("seatType", values.seatType);
        formData.append("maxSeat", values.maxSeat);
        formData.append("price", values.price);
        formData.append("promo", values.promo);
        formData.append("pricePromo", values.pricePromo);

        const response = await axiosInstance().post("/posts/seat", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("====================================");
        console.log("Success", response.data);
        console.log("====================================");
        router.push("/admin/seat");
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setInputCount(value);
    } else {
      setInputCount(0);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-[#F9FAFB] rounded-lg font-bold">
        Create Seat
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="overflow-y-auto ">
            <form
              className="max-w-md mx-auto pt-5"
              onSubmit={formik.handleSubmit}
            >
              <div className="text-center font-bold text-lg text-black">
                Upload Your Seat
              </div>
              <div className="relative z-0 w-full mb-5 group mt-3">
                <input
                  type="text"
                  name="nameSeat"
                  id="nameSeat"
                  onChange={formik.handleChange}
                  value={formik.values.nameSeat}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="nameSeat"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Seat Name
                </label>
              </div>
              <div className="mt-3">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="imgSeat">Seat Picture</Label>
                  <Input
                    id="imgSeat"
                    type="file"
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        formik.setFieldValue("imgSeat", event.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="input-seat mt-3">
                <Label htmlFor="inputSeat">Input Seat</Label>
                <input
                  type="number"
                  id="maxSeat"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="90210"
                  onChange={handleInputChange}
                  required
                />
                <div id="inputContainer">
                  {Array.from({ length: inputCount }, (_, index) => (
                    <div key={index} className="pt-3">
                      <div className="font-bold text-black">{`Seat ${
                        index + 1
                      }`}</div>
                      <div className="grid-seat pt-1">
                        <div className="grid-seat-item">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="seatType"
                              id="seatType"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=""
                              onChange={formik.handleChange}
                              value={formik.values.seatType}
                              required
                            />
                            <label
                              htmlFor="seatType"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Type Seat
                            </label>
                          </div>
                        </div>
                        <div className="grid-seat-item">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="number"
                              name="maxSeat"
                              id="maxSeat"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=""
                              onChange={formik.handleChange}
                              value={formik.values.maxSeat}
                              required
                            />
                            <label
                              htmlFor="maxSeat"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Max Seat
                            </label>
                          </div>
                        </div>
                        <div className="grid-seat-item">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="price"
                              id="price"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=""
                              onChange={formik.handleChange}
                              value={formik.values.price}
                              required
                            />
                            <label
                              htmlFor="price"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Price
                            </label>
                          </div>
                        </div>
                        <div className="grid-seat-item">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="promo"
                              id="promo"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=""
                              onChange={formik.handleChange}
                              value={formik.values.promo}
                            />
                            <label
                              htmlFor="promo"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Promo (Optional)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
              >
                Submit
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
