const ServiceCard = ({ service }) => {
  return (
    <div
      tabIndex={0}
      className="group flex h-40 flex-col justify-center rounded-xl bg-primary-50 px-5 py-4 text-center shadow-sm ring-1 ring-primary-100 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-card hover:ring-2 hover:ring-accent-400 focus:-translate-y-1.5 focus:bg-white focus:shadow-card focus:outline-none focus:ring-2 focus:ring-accent-400"
    >
      <p className="font-display text-base font-semibold text-primary-800 transition-colors group-hover:text-accent-600">
        {service.name}
      </p>
      {service.description && (
        <p className="mt-2 text-sm text-primary-500">{service.description}</p>
      )}
    </div>
  );
};

export default ServiceCard;
