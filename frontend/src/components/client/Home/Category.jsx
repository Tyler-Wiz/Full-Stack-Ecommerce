import Link from "next/link";

const Category = () => {
  return (
    <section className="my-12 lg:container  jost gap-10 lg:h-[400px]">
      <div className="w-3/4 h-[300px] mx-auto lg:w-[45%] lg:h-full">
        <div className="bg-women bg-cover h-full items-end lg:h-full lg:flex relative">
          <Link href={`/products/women`}>
            <p className="bg-white px-2 py-3 ml-10 my-6 text-lg rounded-xl absolute bottom-0">
              Women's Collection
            </p>
          </Link>
        </div>
      </div>

      <div className="flex flex-col px-6 mt-10 gap-10 lg:gap-6 lg:w-[55%] lg:mt-0">
        <div className="">
          <h3 className="text-3xl font-bold my-3">
            Set your wardrobe with our amazing selection!
          </h3>
          <p className="text-sm w-full">
            Elevate your style on and off the field with our fashionable
            sportswear. 40% Off for 15-30 July only.
          </p>
        </div>
        <div className="flex gap-10 h-full">
          <div className="bg-children bg-cover w-full h-[200px] lg:h-full rounded-3xl flex items-end">
            <Link href={`/products/children`}>
              <p className="bg-white px-2 py-3 ml-6 my-6 lg:text-lg text-xs rounded-xl">
                Children's Collection
              </p>
            </Link>
          </div>
          <div className="bg-men bg-cover w-full h-[200px] lg:h-full rounded-3xl flex items-end">
            <Link href={`/products/men`}>
              <p className="bg-white px-2 py-3 ml-6 my-6 lg:text-lg text-xs rounded-xl">
                Men's Collection
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
