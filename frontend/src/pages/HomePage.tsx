import { Link } from "react-router-dom";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "../context/ToastContext";
import EditCustomerDialog from "../components/EditCustomerDialog";
import type { CustomerData } from "../components/EditCustomerDialog";
import { API_URL } from "../config/api";

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
type Props = { searchValue: string; setSearchValue?: (value: string) => void };

const HomePage = (props: Props) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const fetchCustomers = async (): Promise<void> => {
    try {
      const res = await fetch(`${API_URL}/customers`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw Error("Failed to fetch customers");
      }

      const data = await res.json();
      setCustomers(data.customers);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/customer/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      if (!res.ok) {
        throw Error("Failed to delete customer");
      }
      const data = await res.json();
      fetchCustomers();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (id: string, customerData: CustomerData) => {
    try {
      const res = await fetch(`${API_URL}/customer/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!res.ok) {
        throw Error("Failed to update customer");
      }
      const data = await res.json();
      fetchCustomers();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const handleSearch = async () => {
      if (props.searchValue.trim() === "") {
        return;
      } else {
        try {
          const endpoint = `${API_URL}/customers?search=${encodeURIComponent(props.searchValue.trim())}`;

          const res = await fetch(endpoint, {
            signal: controller.signal,
            credentials: "include",
          });
          const data = await res.json();
          if (!data.success) {
            throw Error(data.message);
          }
          setCustomers(data.customers);
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    };

    handleSearch();

    return () => {
      controller.abort();
    };
  }, [props.searchValue]);

  return customers.length === 0 ? (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <Link
          to="/dashboard/add-customer"
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Add Customer
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-gray-300">No customers found</p>
      </div>
    </div>
  ) : (
    <>
      {isEditOpen ? (
        <EditCustomerDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          customer={selectedCustomer}
          onSubmit={handleUpdate}
        />
      ) : (
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2a2e35] border-b border-[#3a3f47]">
                  <th className="text-center text-gray-300 text-sm font-semibold py-3 px-4 w-12">
                    #
                  </th>
                  <th className="text-center text-gray-300 text-sm font-semibold py-3 px-4">
                    Full Name
                  </th>
                  <th className="text-center text-gray-300 text-sm font-semibold py-3 px-4">
                    Gender
                  </th>
                  <th className="text-center text-gray-300 text-sm font-semibold py-3 px-4">
                    Country
                  </th>
                  <th className="text-center text-gray-300 text-sm font-semibold py-3 px-4">
                    Age
                  </th>
                  <th className="text-center text-gray-300 text-sm font-semibold py-3 px-4">
                    Last updated
                  </th>
                  <th className="text-center text-gray-300 text-sm font-semibold py-3 px-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className="border-b border-[#2c313a] hover:bg-[#22262d] transition-colors"
                  >
                    <td className="text-gray-300 text-sm text-center py-3.5 px-4">
                      {index + 1}
                    </td>
                    <td className="text-center text-gray-300 text-sm py-3.5 px-4">
                      {customer.first_name + " " + customer.last_name}
                    </td>
                    <td className="text-center text-gray-300 text-sm py-3.5 px-4">
                      {customer.gender}
                    </td>
                    <td className="text-center text-gray-300 text-sm py-3.5 px-4">
                      {customer.country}
                    </td>
                    <td className="text-center text-gray-300 text-sm py-3.5 px-4">
                      {customer.age}
                    </td>
                    <td className="text-center text-gray-300 text-sm py-3.5 px-4">
                      {moment(customer.last_update).fromNow()}
                    </td>
                    <td className="text-center py-3.5 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <Link
                          to={`customer/${customer.id}`}
                          className="w-8 h-8 bg-[#10b981] rounded flex items-center justify-center hover:bg-[#059669] transition-colors"
                        >
                          <FaEye className="w-3.5 h-3.5 text-white" />
                        </Link>
                        <button
                          className="w-8 h-8 bg-[#3b82f6] rounded flex items-center justify-center hover:bg-[#2563eb] transition-colors"
                          onClick={() => {
                            setIsEditOpen(true);
                            setSelectedCustomer(customer);
                          }}
                        >
                          <FaPen className="w-3.5 h-3.5 text-white" />
                        </button>
                        <button
                          className="w-8 h-8 bg-[#ef4444] rounded flex items-center justify-center hover:bg-[#dc2626] transition-colors"
                          onClick={() => handleDelete(customer.id)}
                        >
                          <FaTrash className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
