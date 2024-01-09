import Link from "next/link";

const Category = () => {
  return (
    <section className="my-20 container jost gap-10 h-[400px]">
      <div className="bg-women bg-cover h-full w-[45%] flex items-end">
        <Link href={`/products/women`}>
          <p className="bg-white px-2 py-3 ml-10 my-6 text-lg rounded-xl">
            Women's Collection
          </p>
        </Link>
      </div>
      <div className="flex flex-col gap-6 w-[55%]">
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
          <div className="bg-children bg-cover w-full rounded-3xl flex items-end">
            <p className="bg-white px-2 py-3 ml-6 my-6 text-lg rounded-xl">
              Children's Collection
            </p>
          </div>
          <div className="bg-men bg-cover w-full rounded-3xl flex items-end">
            <Link href={`/products/men`}>
              <p className="bg-white px-2 py-3 ml-6 my-6 text-lg rounded-xl">
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
