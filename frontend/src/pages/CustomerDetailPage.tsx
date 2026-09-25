import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import moment from "moment";
import { toast } from "../context/ToastContext";

const CustomerDetailPage = () => {
  type Customer = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    gender: string;
    age: number;
    country: string;
    last_update: string;
  };

  const params = useParams<{ id: string }>();
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/customer/${params.id}`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch customer data");
      }
      const data = await res.json();
      setCustomerData(data.customers);
      console.log(data.customers);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [params]);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 text-sm">
          <Link to="/dashboard" className="text-[#3b82f6] hover:underline">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">{`${customerData?.first_name} ${customerData?.last_name}`}</span>
        </div>
        <span className="text-gray-400 text-sm">Id : {params.id}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl border-collapse">
          <tbody>
            <tr className="border-b border-[#2c313a] bg-[#252930]">
              <td className="text-white text-sm font-medium py-3 px-5 w-48 border-r border-[#3a3f47]">
                Full Name
              </td>
              <td className="text-gray-300 text-sm py-3 px-5">
                {customerData?.first_name + " " + customerData?.last_name}
              </td>
            </tr>
            <tr className="border-b border-[#2c313a] bg-[#21252b]">
              <td className="text-white text-sm font-medium py-3 px-5 w-48 border-r border-[#3a3f47]">
                Email
              </td>
              <td className="text-gray-300 text-sm py-3 px-5">
                {customerData?.email}
              </td>
            </tr>
            <tr className="border-b border-[#2c313a] bg-[#252930]">
              <td className="text-white text-sm font-medium py-3 px-5 w-48 border-r border-[#3a3f47]">
                Telephone
              </td>
              <td className="text-gray-300 text-sm py-3 px-5">
                {customerData?.telephone}
              </td>
            </tr>
            <tr className="border-b border-[#2c313a] bg-[#21252b]">
              <td className="text-white text-sm font-medium py-3 px-5 w-48 border-r border-[#3a3f47]">
                Gender
              </td>
              <td className="text-gray-300 text-sm py-3 px-5">
                {customerData?.gender}
              </td>
            </tr>
            <tr className="border-b border-[#2c313a] bg-[#252930]">
              <td className="text-white text-sm font-medium py-3 px-5 w-48 border-r border-[#3a3f47]">
                Age
              </td>
              <td className="text-gray-300 text-sm py-3 px-5">
                {customerData?.age}
              </td>
            </tr>
            <tr className="border-b border-[#2c313a] bg-[#21252b]">
              <td className="text-white text-sm font-medium py-3 px-5 w-48 border-r border-[#3a3f47]">
                Country
              </td>
              <td className="text-gray-300 text-sm py-3 px-5">
                {customerData?.country}
              </td>
            </tr>
            <tr className="border-b border-[#2c313a] bg-[#252930]">
              <td className="text-white text-sm font-medium py-3 px-5 w-48 border-r border-[#3a3f47]">
                Last Updated
              </td>
              <td className="text-gray-300 text-sm py-3 px-5">
                {moment(customerData?.last_update).fromNow()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
