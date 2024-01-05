import ManageProducts from "@/components/dashboard/products/ManageProducts";
import AdminLayout from "@/components/dashboard/shared/Layout";
import { getProducts } from "@/services/api/fetch/fetchAll";
import { DateTimeComponent } from "@/utils/DateTime";

const page = async () => {
  const currentDate = DateTimeComponent();
  const products = await getProducts();
  return (
    <AdminLayout title="Product Grid" currentDate={currentDate}>
      <ManageProducts products={products} />
    </AdminLayout>
  );
};

export default page;
