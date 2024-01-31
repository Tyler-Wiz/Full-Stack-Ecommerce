import RenderProductList from "../product/RenderProductList";

const RenderOrderPage = ({ orderItems }) => {
  return (
    <section className="lg:container flex-col my-4 lg:px-0 px-4">
      {orderItems.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {orderItems.map((item, index) => (
            <div key={index} className="lg:w-[32%] w-[48%]">
              <RenderProductList product={item} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No order yet</p>
      )}
    </section>
  );
};

export default RenderOrderPage;
