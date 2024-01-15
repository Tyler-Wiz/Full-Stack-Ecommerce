"use client";
import { useState } from "react";
import Button from "../shared/Button";
import { FaPlus, FaMinus } from "react-icons/fa6";

const questions = [
  {
    question: "How do I determine the right size for my sportswear?",
    answer:
      "We provide a detailed size guide on each product page to help you find the perfect fit. You can refer to the measurements and follow our ideal sizing recommendations. If you have any specific questions about sizing, feel free to reach out to our customer support team for assistance.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    question: "How do I return an item?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
];

const QuestionsSection = () => {
  const [active, setActive] = useState({
    active: true,
    id: 0,
  });

  const toggleActive = (id) => {
    setActive((prevState) => {
      if (prevState.id === id) {
        return {
          active: !prevState.active,
          id: id,
        };
      } else {
        return {
          active: true,
          id: id,
        };
      }
    });
  };

  return (
    <section className="lg:container my-20 gap-10 px-6 lg:px-0">
      <div className="bg-mountain bg-cover h-[350px] w-full lg:h-[500px] lg:w-[45%]">
        <div className=" w-[60%] px-6 pt-16">
          <h1 className="text-3xl text-black font-bold py-3">REACH THE PEAK</h1>
          <p className="montserrat pb-10">
            Discover the perfect gear to elevate your performance.
          </p>
          <Button
            name="Explore More"
            color="text-white"
            backgroundColor="bg-primary"
            border="border-2"
          />
        </div>
      </div>
      <div className="lg:w-[55%] lg:mt-0 mt-10 ">
        <h1 className="text-3xl text-black font-bold py-3">FAQ</h1>
        {questions.map((item, index) => (
          <div
            key={index}
            className="jost flex flex-col gap-6 py-6 border-b-[1px]">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg">{item.question}</h1>
              <button onClick={() => toggleActive(index)}>
                {active.id === index ? (
                  <FaMinus size={25} />
                ) : (
                  <FaPlus size={25} />
                )}
              </button>
            </div>
            {active.id === index && (
              <p className="montserrat text-sm text-secondary duration-700 ">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuestionsSection;
