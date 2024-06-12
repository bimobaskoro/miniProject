"use client";
import { axiosInstance } from "@/app/_lib/axios";
import { TTransaction } from "@/app/_models/transaction.model";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { Checkbox } from "@/components/ui/checkbox";

export default function TransactionComponent() {
  const [transactionData, setTransactionData] = useState<TTransaction | null>(
    null
  );
  const [usePoints, setUsePoints] = useState(false);
  const queryParams = useSearchParams();
  const user = useSelector((state: RootState) => state.auth);
  console.log("User", user);

  useEffect(() => {
    const id = queryParams.get("id");

    const fetchTransaction = async () => {
      if (!id) return;

      try {
        const response = await axiosInstance().get(`/transaction/${id}`);
        console.log("====================================");
        console.log("Response :", response);
        console.log("====================================");

        setTransactionData(response.data.data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [queryParams]);

  const handleCheckboxChange = () => {
    setUsePoints(!usePoints);
  };
  const calculateTotalPrice = () => {
    if (!transactionData) return 0;

    let totalPrice = transactionData.totalPrice;
    if (usePoints && user.userData?.point) {
      totalPrice -= user.userData.point;
    }

    return totalPrice < 0 ? 0 : totalPrice; // Ensure total price does not go below 0
  };

  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Your Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          {transactionData ? (
            <form>
              <div>
                <div>{transactionData?.event?.title}</div>
                <div>
                  Seat Type : {transactionData?.eventPrice?.categoryEvent}
                </div>
                <div>Total Qty : {transactionData.totalQty}</div>
                <div className="flex items-center space-x-2 justify-between mt-5">
                  <div>
                    <div>Your Point : {user.userData?.point}</div>
                    <Checkbox
                      id="terms"
                      checked={usePoints}
                      onClick={handleCheckboxChange}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Use Your Point
                    </label>
                  </div>
                  <div>
                    <div>Total Price</div>
                    <div>{calculateTotalPrice()}</div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-[8px] bg-[#007BFF] p-2 font-bold text-white w-[20%]"
              >
                Pay
              </button>
            </form>
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
