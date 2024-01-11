export const getProducts = async () => {
  const response = await fetch(`http://localhost:4002/api/products/`, {
    next: { revalidate: 3600 },
  });
  const data = await response.json();
  return data;
};

export const getSingleProduct = async (id) => {
  const response = await fetch(`http://localhost:4002/api/products/${id}`, {
    next: { revalidate: 3600 },
  });
  const data = await response.json();
  return data;
};
