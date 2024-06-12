"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { axiosInstance } from "@/app/_lib/axios";
import { TTransaction } from "@/app/_models/transaction.model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TransactionComponent() {
  const [transactionData, setTransactionData] = useState<TTransaction | null>(
    null
  );
  const [usePoints, setUsePoints] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [remainingPoints, setRemainingPoints] = useState<number | null>(null);
  const queryParams = useSearchParams();
  const user = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const id = queryParams.get("id");

    const fetchTransaction = async () => {
      if (!id) return;

      try {
        const response = await axiosInstance().get(`/transaction/${id}`);
        setTransactionData(response.data.data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [queryParams]);

  useEffect(() => {
    if (transactionData && user.userData) {
      const price = usePoints
        ? Math.max(transactionData.totalPrice - user.userData.point, 0)
        : transactionData.totalPrice;
      console.log("Price updated:", price);
      setTotalPrice(price);
    }
  }, [transactionData, usePoints, user.userData?.point]);

  useEffect(() => {
    if (user.userData) {
      let updatedPoint = user.userData.point;

      if (usePoints && typeof transactionData?.totalPrice !== "undefined") {
        updatedPoint = Math.max(
          user.userData.point - transactionData.totalPrice,
          0
        );
      }
      console.log("Points updated:", updatedPoint);
      setRemainingPoints(updatedPoint);
    }
  }, [usePoints, totalPrice, user.userData]);

  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Your Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          {transactionData ? (
            <Formik
              initialValues={{
                point: user.userData?.point ?? 0,
                totalPrice: totalPrice,
              }}
              onSubmit={async (values) => {
                try {
                  let calculatedTotalPrice = totalPrice;
                  let calculatedPoint = usePoints
                    ? Math.min(
                        user.userData?.point ?? 0,
                        transactionData.totalPrice
                      )
                    : 0;

                  calculatedTotalPrice = Math.max(
                    transactionData.totalPrice - calculatedPoint,
                    0
                  );

                  // Update remaining points
                  const remainingPoints = Math.max(
                    (user.userData?.point ?? 0) - calculatedPoint,
                    0
                  );
                  console.log("Remaining Points:", remainingPoints);

                  // Lakukan patch request untuk memperbarui transaksi
                  const response = await axiosInstance().patch(
                    `/transaction/update/${transactionData?.id}`,
                    {
                      point: remainingPoints,
                      totalPrice: calculatedTotalPrice,
                    }
                  );

                  console.log("Transaction updated:", response);
                  Swal.fire({
                    title: "Success!",
                    text: "Your transaction was successful",
                    icon: "success",
                    confirmButtonText: "OK",
                  }).then(() => {
                    router.push("/");
                  });
                } catch (error) {
                  console.error("Error updating transaction:", error);
                  Swal.fire({
                    title: "Error",
                    text: "There was an error updating your transaction",
                    icon: "error",
                    confirmButtonText: "OK",
                  });
                }
              }}
            >
              {({ getFieldProps, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <div>
                    <div>{transactionData?.event?.title}</div>
                    <div>
                      Seat Type: {transactionData?.eventPrice?.categoryEvent}
                    </div>
                    <div>Total Qty: {transactionData.totalQty}</div>
                    <div className="flex items-center space-x-2 justify-between mt-5">
                      <div>
                        <div>Your Point: {user.userData?.point}</div>
                        <input
                          type="checkbox"
                          name="usePoints"
                          id="usePoints"
                          checked={usePoints}
                          onChange={(e) => setUsePoints(e.target.checked)}
                        />
                        <label htmlFor="usePoints">Use Your Points</label>
                      </div>
                      <div>
                        <div>Total Price: {Math.max(0, totalPrice)}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="rounded-[8px] bg-[#007BFF] p-2 font-bold text-white w-[20%]"
                  >
                    Pay
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <center>
              <div className="custom-loader"></div>
            </center>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
