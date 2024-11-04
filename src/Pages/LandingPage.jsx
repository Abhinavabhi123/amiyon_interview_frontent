import Navbar from "../Components/Navbar";
import CompanyImage from "../assets/company.jpg";

export default function LandingPage() {
  return (
    <div className="w-screen h-dvh max-w-screen overflow-x-hidden">
      <Navbar />
      <div className="w-full h-[89%]">
        <img
          src={CompanyImage}
          alt="company image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
