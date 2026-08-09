import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Service from "./models/Service.js";

dotenv.config();

const services = [
  { name: "Regular healthcare package", description: "Routine checkups and general wellness screening." },
  { name: "CT-SCAN | X-RAY", description: "Advanced diagnostic imaging services." },
  { name: "Lab Test", description: "Comprehensive laboratory testing and reports." },
  { name: "Gynae Health", description: "Specialized care for women's health." },
  { name: "Ayurveda Treatment", description: "Holistic treatments rooted in Ayurvedic practice." },
  { name: "Dental Checkup", description: "Complete dental examination and cleaning." },
];

const run = async () => {
  await connectDB();
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log("Services seeded");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
