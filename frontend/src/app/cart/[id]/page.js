import RenderCartPage from "@/components/client/cart/RenderCartPage";
import axios from "axios";

const getCartItems = async (id) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/cart/items`,
    {
      id: id,
    }
  );
  return res.data;
};

const page = async ({ params }) => {
  const id = params.id;
  const cartItem = await getCartItems(id);
  return <RenderCartPage cartItem={cartItem} />;
};

export default page;
