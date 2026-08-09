import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

/**
 * Accessible accordion for FAQs.
 */
const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="divide-y divide-primary-100 overflow-hidden rounded-2xl border border-primary-100 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-primary-50"
            >
              <span className="font-display text-sm font-semibold text-primary-900 sm:text-base">
                {item.question}
              </span>
              <HiChevronDown
                size={20}
                className={`shrink-0 text-primary-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-panel-${index}`}
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm leading-relaxed text-primary-600">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
