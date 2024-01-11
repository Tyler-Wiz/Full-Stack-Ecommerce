import { useState } from "react";
import Button from "../shared/Button";
import Link from "next/link";
import axios from "axios";

const PayButton = ({ cartItem, user_id, googleUser }) => {
  const [checkOutError, setCheckOutError] = useState(null);

  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4002/api/order/create-checkout-session`,
        { cart: cartItem, user_id },
        {
          withCredentials: true,
        }
      );
      if (res.data.url) {
        const res = await axios.post(
          `http://localhost:4002/api/order/`,
          { order_items: cartItem },
          {
            withCredentials: true,
          }
        );
      }
      window.location.href = res.data.url;
      window.localStorage.removeItem("cartItems");
    } catch (error) {
      setCheckOutError(error.response.data.errorMessage);
    }
  };

  return (
    <>
      {user_id || googleUser ? (
        <Button
          name="CheckOut"
          backgroundColor="bg-primary"
          color="text-white"
          width="w-full"
          onClick={() => handleCheckout()}
        />
      ) : (
        <Link href="/login" className="my-4">
          <Button
            name="login to Place order"
            backgroundColor="bg-primary"
            color="text-white"
            width="w-full"
          />
        </Link>
      )}
      {checkOutError && <p className="text-red-500">{checkOutError}</p>}
    </>
  );
};

export default PayButton;
