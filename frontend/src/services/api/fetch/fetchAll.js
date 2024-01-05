export const getCategories = async () => {
  const response = await fetch(`http://localhost:4002/api/category/`, {
    next: { revalidate: 0 },
  });
  const data = await response.json();
  return data;
};

export const getBrands = async () => {
  const response = await fetch(`http://localhost:4002/api/brand/`);
  const data = await response.json();
  return data;
};

export const getProducts = async () => {
  const response = await fetch(`http://localhost:4002/api/products/`, {
    next: { revalidate: 0 },
  });
  const data = await response.json();
  return data;
};

export const getSingleProduct = async (id) => {
  const response = await fetch(`http://localhost:4002/api/products/${id}`, {
    next: { revalidate: 0 },
  });
  const data = await response.json();
  return data;
};

export const getAttributes = async () => {
  const response = await fetch(
    `http://localhost:4002/api/attributes/option/all`
  );
  const data = await response.json();
  return data;
};

export const getDiscounts = async () => {
  const response = await fetch(`http://localhost:4002/api/discount/`);
  const data = await response.json();
  return data;
};
