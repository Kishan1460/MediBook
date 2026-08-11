import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import ServiceCard from "../components/ServiceCard";
import Carousel from "../components/Carousel";
import Accordion from "../components/Accordion";
import { fetchServices } from "../redux/slices/serviceSlice";

// Highlight slides for the Services page
const highlightSlides = [
  {
    title: "Same-day appointments",
    body: "Book a slot with a specialist today — most requests are confirmed within the hour.",
  },
  {
    title: "Trusted specialists",
    body: "Every doctor on our platform is verified and rated by real patients.",
  },
  {
    title: "Reports, all in one place",
    body: "Upload and revisit your lab reports whenever you need them, from any device.",
  },
];

// FAQ questions for the Services page
const faqItems = [
  {
    question: "How do I book an appointment?",
    answer:
      "Go to \"Book an appointment\" in the top menu, pick a date and time, choose the department you need, and submit the form. You'll see it right away under \"My appointment.\"",
  },
  {
    question: "Can I reschedule or cancel a booking?",
    answer:
      "Yes. Open the appointment from \"My appointment\" and use the reschedule or cancel option. Changes are saved immediately, no phone calls needed.",
  },
  {
    question: "Is my medical information kept private?",
    answer:
      "Yes. Your profile, reports, and appointment history are only visible to you and the care team assigned to your visit.",
  },
  {
    question: "What if I don't know which department to pick?",
    answer:
      "Choose \"Regular healthcare package\" and describe your symptoms in the comments box — our team will route you to the right specialist.",
  },
  {
    question: "Do I need to create an account to browse services?",
    answer:
      "You can browse services without an account, but booking an appointment requires a quick sign-up so we can keep your visit history in one place.",
  },
];

const Services = () => {
  const dispatch = useDispatch();
  const { items: services, loading } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <AppLayout>
      <div className="mx-auto flex max-w-5xl flex-col gap-10 pb-10">
        <Carousel
          className="shadow-card"
          slides={highlightSlides.map((slide) => (
            <div
              key={slide.title}
              className="flex min-h-[160px] flex-col justify-center gap-2 bg-gradient-to-r from-primary-700 to-primary-500 px-8 py-10 text-white sm:min-h-[200px]"
            >
              <h2 className="font-display text-xl font-semibold sm:text-2xl">{slide.title}</h2>
              <p className="max-w-xl text-sm text-primary-50 sm:text-base">{slide.body}</p>
            </div>
          ))}
        />

        <section>
          <h1 className="mb-4 font-display text-xl font-semibold text-primary-900">
            Our Services
          </h1>
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-40 animate-pulse rounded-xl bg-primary-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service._id || service.name} service={service} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-primary-900">
            Frequently Asked Questions
          </h2>
          <Accordion items={faqItems} />
        </section>
      </div>
    </AppLayout>
  );
};

export default Services;
