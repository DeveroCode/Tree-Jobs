import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

export default function Not_found() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-1/3 object-cover py-10"
      >
        <source src="/error-404.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 className="text-8xl font-bold font-serif mb-5">Oooops!</h1>
      <p className="text-4xl font-serif">
        Looks like you're in the wrong place
      </p>
      <span className="text-md mt-3 font-light">
        We can't find the page you're looking for...{" "}
        <Link to={"/tree-jobs"} className="font-bold text-purple-700">
          <MoveRight className="inline w-4 h-4" />
          Take me home
        </Link>
      </span>
    </div>
  );
}
