export const getProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/products/`
  );
  const data = await response.json();
  return data;
};

export const getSingleProduct = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/products/${id}`
  );
  const data = await response.json();
  return data;
};

export const getOrderByUser = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/order/${id}`,
    {
      next: { revalidate: 0 },
    }
  );
  const data = await response.json();
  return data;
};
