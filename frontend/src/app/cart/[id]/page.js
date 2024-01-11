import RenderCartPage from "@/components/client/cart/RenderCartPage";
import axios from "axios";

const getCartItems = async (id) => {
  const res = await axios.post("http://localhost:4002/api/cart/items", {
    id: id,
  });
  return res.data;
};

const page = async ({ params }) => {
  const id = params.id;
  const cartItem = await getCartItems(id);
  return <RenderCartPage cartItem={cartItem} />;
};

export default page;
