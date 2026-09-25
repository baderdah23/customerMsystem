import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="w-full h-[calc(100vh-115px)] flex items-center justify-center">
      <FaSpinner className="w-10 h-10 text-white animate-spin" />
    </div>
  );
};

export default Loader;
