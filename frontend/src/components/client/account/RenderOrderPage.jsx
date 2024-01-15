import RenderProductList from "../product/RenderProductList";

const RenderOrderPage = ({ orderItems }) => {
  return (
    <section className="lg:container flex-col my-4 lg:px-0 px-4">
      <h1 className="lg:text-4xl font-bold montserrat my-1">
        Your Latest Orders
      </h1>
      <div className="flex flex-wrap lg:gap-4 gap-2 w-full my-4">
        {orderItems.map((item, index) => (
          <div key={index} className="lg:w-[24%] w-[48%] ">
            <RenderProductList product={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RenderOrderPage;
