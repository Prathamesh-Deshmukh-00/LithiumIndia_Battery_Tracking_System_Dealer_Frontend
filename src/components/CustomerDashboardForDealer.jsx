import React, { useState, useEffect } from "react";
import { CustomerForm, Toggle, Loading } from "./index.js";
import { Pencil, Calendar, Search } from "lucide-react";
import { ToastContainer, toast, Slide } from "react-toastify";
// import api
import {
  blockCustomer,
  deleteCustomer,
  getAllIndependentCustomers,
  getIndependentCustomerByName,
  registerCustomer,
  updateCustomer,
} from "../API/DEALERSIDE_API/Api.js";

const CustomerDashboardForDealer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selected, setselected] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);
  const [Customerdetails, setCustomerdetails] = useState({});
  const [toggle, settoggle] = useState([]);
  const [toggle2, setToggle2] = useState([]);
  const [searchId, setSearchId] = useState(false);
  const [tableData, setTabledata] = useState([]);
  const [paginationTotal, setPaginationTotal] = useState(1);
  const [searchcustomerdata, setSearchcustomerdata] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [devices, setDevices] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    contactNumber: "",
    addressState: "",
    addressCity: "",
  });
  const [formData3, setFormData3] = useState({
    customerName: "",
    email: "",
    contactNumber: "",
    addressState: "",
    addressCity: "",
  });

  useEffect(() => {
    setselected(1);
    setToggle2([]);
    settoggle([]);
  }, [selectedDate]);

  useEffect(() => {
    setTabledata([]);
    setToggle2([]);
  }, [selected]);

  useEffect(() => {
    if (searchcustomerdata && Object.keys(searchcustomerdata).length > 0) {
      const status = searchcustomerdata.map((device, index) => {
        return {
          index: index,
          statusdata: device?.isBlocked,
        };
      });
      settoggle(status);
    }
  }, [searchcustomerdata]);

  useEffect(() => {
    async function abc() {
      if (tableData && Object.keys(tableData).length > 0) {
        console.log("useeffect is called ");
        const status = await tableData.map((device, index) => {
          return {
            index: index,
            statusdata: device.isBlocked,
          };
        });
        await setToggle2(status);
        console.log("toggle data is in side :- ", status);
      }
    }
    abc();
  }, [tableData]);

  useEffect(() => {
    const fetchData = async () => {
      setTabledata([]);
      console.log("selected date before hit api", selectedDate.toString());
      const sample = await getAllIndependentCustomers(selectedDate, selected);
      // console.log("sample data is :- ", sample);
      if (sample.data.length != 0) {
        setTabledata(sample.data);
        setPaginationTotal(sample.total ? Math.ceil(sample.total / 7) : 1);
        console.log("all customer  data :- ", sample.data);
      } else {
        setTabledata(null);
        setPaginationTotal(0);
      }
    };
    fetchData();
  }, [selectedDate, selected]);

  const handleSearch = async () => {
    console.log("search triggered");

    if (searchTerm.trim() !== "") {
      const data = await getIndependentCustomerByName(searchTerm.trim());
      if (data && data.length === 0) {
        setSearchId(false);
        toast.error("Device is not found");
      } else if (data[0]?.customerId) {
        setSearchId(true);
        setSearchcustomerdata(data);
      } else {
        toast.error("Something went wrong, please try again");
      }
      console.log("response from backend:", data);
    } else {
      toast.warn("Please enter something before searching");
    }
  };

  const handleTabClick = (label) => {
    setActiveTab(label);
    if (label === "Today") {
      setSelectedDate(new Date().toISOString().split("T")[0]);
    } else if (label === "Yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      setSelectedDate(yesterday.toISOString().split("T")[0]);
    }
  };

  const handleSubmit = async () => {
    console.log("Customer Data :", formData);
    const data = {
      name: formData.customerName,
      email: formData.email,
      phone: formData.contactNumber,
      role: "customer",
      city: formData.addressCity,
      state: formData.addressState,
    };
    const token = localStorage.getItem("accessToken").toString();
    console.log("Token is :-", token);
    console.log("data is :-", data);
    const result = await registerCustomer(data, token);
    console.log("API Response:", result);
    if (result) {
      setCustomerdetails({
        customername: formData.customerName,
        password: result.data.password,
      });
      console.log("add customer api data :- ", result);
      toast.success("Customer registered successfully");
      setFormData({
        customerName: "",
        email: "",
        contactNumber: "",
        addressState: "",
        addressCity: "",
      });
      setShowForm(false);
      setShowForm4(true);
    } else {
      toast.error(result.message);
    }
  };

  const handleSubmit3 = async () => {
    console.log("Customer Data :", formData3);
    const data = {
      name: formData3.customerName,
      email: formData3.email,
      phone: formData3.contactNumber,
      role: "customer",
      city: formData3.addressCity,
      state: formData3.addressState,
    };
    console.log("data is :-", data);
    const result = await updateCustomer(customerId, data);
    console.log("API Response:", result);
    try {
      if (result.status && result.status == 200) {
        if (searchTerm.trim() != "") {
          async function abc() {
            const data = await getIndependentCustomerByName(searchTerm.trim());
            if (data && data.length == 0) {
              const data = await getIndependentCustomerByName(
                formData3.customerName.trim()
              );
              if (data && data.length == 0) {
                setSearchcustomerdata([]);
                setselected(1);
                setSearchTerm("");
              } else if (data[0]?.customerId) {
                setSearchId(true);
                setSearchcustomerdata(data);
                setSearchTerm(formData3.customerName);
              } else {
                toast.error("Something Went wrong please try again");
              }
            } else if (data[0]?.customerId) {
              setSearchId(true);
              setSearchcustomerdata(data);
            } else {
              toast.error("Something Went wrong please try again");
            }
            console.log("response come from backend for id ", data);
          }
          abc();
        } else {
          const fetchData = async () => {
            console.log(
              "selected date before hit api",
              selectedDate.toString()
            );
            const sample = await getAllIndependentCustomers(
              selectedDate,
              selected
            );
            setTabledata(sample.data);
            setPaginationTotal(sample.total ? Math.ceil(sample.total / 7) : 1);
            console.log("all customer  data :- ", sample.data);
          };
          fetchData();
        }
        console.log("update customer api data :- ", result);
        toast.success("Customer updated successfully");
        setFormData3({
          customerName: "",
          email: "",
          contactNumber: "",
          addressState: "",
          addressCity: "",
        });
        setShowForm3(false);
      } else {
        console.log(
          "result in error i s:-",
          result?.response?.data?.message || result?.message
        );
        toast.error(
          result?.response?.data?.message ||
            result?.message ||
            "some error occurs "
        );
      }
    } catch (error) {
      toast.error(
        "error occcurs  : ",
        error.response?.data ||
          error.message ||
          "some error occurs please raise ticket"
      );
    }
  };

  return (
    <div className="p-6 bg-green-50">
      <h2 className="text-2xl font-semibold mb-4">Manage Customer</h2>
      {/* Search & Actions */}
      <div className="flex justify-between flex-wrap gap-3 bg-white p-4 rounded-lg mb-4">
        <div className="flex flex-wrap gap-3 w-full sm:w-auto items-center">
          <div className="flex items-center bg-green-100 p-2 px-4 rounded-full w-full sm:w-[350px]">
            <Search className="w-4 h-4 text-gray-500 mr-2" />

            <input
              type="text"
              placeholder="Search by customer name"
              className="bg-transparent outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // 🔑 call the same function as button
                }
              }}
            />

            <button
              className="text-sm rounded-full hover:bg-green-300 bg-white px-3 py-1"
              onClick={handleSearch} // 🔑 reuse same function
            >
              Search
            </button>
          </div>

          <button
            className="bg-[#019D6D] text-white text-sm px-4 py-2 rounded-lg"
            onClick={() => setShowForm(true)}
          >
            + Add Customer
          </button>
        </div>

        {!searchId ? (
          <div className="flex items-center gap-2">
            {
              <div className="flex bg-white rounded-lg overflow-hidden">
                {["Today", "Yesterday"].map((label) => (
                  <button
                    key={label}
                    onClick={() => handleTabClick(label)}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === label
                        ? "bg-[#019D6D] text-white"
                        : "text-gray-500 border border-gray-400 hover:bg-green-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            }
            <div className="flex items-center gap-1 px-4 py-2 bg-white rounded-lg border border-gray-300">
              <Calendar size={16} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setActiveTab("");
                }}
                className="text-sm bg-transparent outline-none"
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-green-100 text-left text-gray-600">
            <tr>
              <th className="px-6 py-3">Customer Name</th>
              <th className="px-6 py-3">Email Id</th>
              <th className="px-6 py-3">Contact Number</th>
              <th className="px-6 py-3">Added on</th>
              <th className="px-6 py-3">Devices sell</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          {(searchcustomerdata &&
            Object.keys(searchcustomerdata).length !== 0) ||
          Number(toggle.length) !== 0 ? (
            <tbody>
              {searchcustomerdata.map((customer, index) => (
                <tr
                  key={index}
                  className={` hover:bg-gray-50  ${
                    toggle.length != 0
                      ? toggle[index]?.statusdata
                        ? "text-gray-400"
                        : ""
                      : ""
                  }  `}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {console.log("searchcustomerdata : ", searchcustomerdata)}
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.createdAt?.slice(0, 10)}
                  </td>
                  <td
                    className="px-6 py-4  flex items-center  justify-center whitespace-nowrap"
                    onClick={() => {
                      const temp = [];
                      customer?.devices.map((device, index) => {
                        temp.push(`${device?.deviceName}  ${device?.imei}`);
                      });
                      setDevices(temp);
                      setShowForm2(true);
                    }}
                  >
                    <p className="hover:bg-emerald-700 mr-8 rounded mb-1 px-5 flex justify-center items-center border border-emerald-600">
                      {customer.devicesSold}
                    </p>
                  </td>
                  <td className="px-6 py-4 w-64 break-words">
                    {customer.address
                      ? `${customer.address.city}, ${customer.address.state}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {console.log("i am awasome")}
                    <Toggle
                      value={
                        toggle?.length != 0 ? toggle[index]?.statusdata : ""
                      }
                      onClick={() => {
                        async function testing() {
                          const response = await blockCustomer(
                            customer.customerId,
                            !toggle[index].statusdata
                          );

                          if (
                            response == "Customer successfully blocked" ||
                            response == "Customer successfully unblocked"
                          ) {
                            // console.log("if called in blocaking ,",response);
                            settoggle((prevStates) =>
                              prevStates.map((item) =>
                                item.index === index
                                  ? { ...item, statusdata: !item.statusdata }
                                  : item
                              )
                            );
                          } else {
                            toast.error(
                              "Some error occurs while doing process please try again some time.."
                            );
                          }
                        }

                        testing();
                      }}
                    />
                    <Pencil
                      className="w-4 h-4 text-gray-600 cursor-pointer"
                      onClick={() => {
                        setShowForm3(true);

                        const data = {
                          customerName: customer.name,
                          email: customer.email,
                          contactNumber: customer.phone,
                          addressState: customer.address.state,
                          addressCity: customer.address.city,
                        };

                        setFormData3(data);
                        setCustomerId(customer.customerId);
                      }}
                    />

                    <button
                      onClick={() => {
                        (async function () {
                          const response = await deleteCustomer(
                            customer.customerId
                          );
                          if (response) {
                            if (searchTerm.trim() != "") {
                              async function abc() {
                                const data = await getIndependentCustomerByName(
                                  searchTerm.trim()
                                );
                                if (data && data.length == 0) {
                                  toast.error("Device is not found");
                                } else if (data[0]?.customerId) {
                                  setSearchId(true);
                                  setSearchcustomerdata(data);
                                } else {
                                  toast.error(
                                    "Something Went wrong please try again"
                                  );
                                }
                                console.log(
                                  "response come from backend for id ",
                                  data
                                );
                              }
                              abc();
                            } else {
                              toast.warn(
                                "Please Enter something before hit search Button"
                              );
                            }
                            toast.success("Customer delete successfully ");
                          } else {
                            toast.error(
                              "Something went wrong please try again "
                            );
                          }
                        })();
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : tableData && tableData?.length != 0 && tableData != null ? (
            <tbody>
              {tableData.map((customer, index) => (
                <tr
                  key={index}
                  className={` hover:bg-gray-50 ${
                    Number(toggle2.length) !== 0
                      ? toggle2[index]?.statusdata
                        ? "text-gray-400"
                        : ""
                      : ""
                  } `}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {console.log("tableData :- ", tableData)}
                    {customer.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.addedOn?.slice(0, 10)}
                  </td>
                  <td
                    className="px-6 py-4  flex items-center  justify-center whitespace-nowrap"
                    onClick={() => {
                      setDevices(customer.devices);
                      setShowForm2(true);
                    }}
                  >
                    <p className="hover:bg-emerald-700 mr-8 rounded mb-1 px-5 flex justify-center items-center border border-emerald-600">
                      {customer.devicesSoldCount}
                    </p>
                  </td>
                  <td className="px-6 py-4 w-64 break-words">
                    {customer.address}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Toggle
                      value={
                        toggle2.length != 0 ? toggle2[index]?.statusdata : ""
                      }
                      onClick={() => {
                        async function testing() {
                          const response = await blockCustomer(
                            customer.customerId,
                            !toggle2[index]?.statusdata
                          );

                          if (
                            response == "Customer successfully blocked" ||
                            response == "Customer successfully unblocked"
                          ) {
                            // console.log("if called in blocaking ,",response);
                            setToggle2((prevStates) =>
                              prevStates.map((item) =>
                                item.index === index
                                  ? { ...item, statusdata: !item.statusdata }
                                  : item
                              )
                            );
                          } else {
                            toast.error(
                              "Some error occurs while doing process please try again some time.."
                            );
                          }
                        }

                        testing();
                      }}
                    />
                    <Pencil
                      className="w-4 h-4 text-gray-600 cursor-pointer"
                      onClick={() => {
                        setShowForm3(true);

                        const [city, state] = customer.address
                          .split(",")
                          .map((part) => part.trim());

                        const data = {
                          customerName: customer.customerName,
                          email: customer.email,
                          contactNumber: customer.phone,
                          addressCity: city, // "pune"
                          addressState: state, // "Maharashtra"
                        };

                        setFormData3(data);
                        setCustomerId(customer.customerId);
                      }}
                    />

                    <button
                      onClick={() => {
                        (async function () {
                          const response = await deleteCustomer(
                            customer.customerId
                          );
                          if (response) {
                            const fetchData = async () => {
                              console.log(
                                "selected date before hit api",
                                selectedDate.toString()
                              );
                              const sample = await getAllIndependentCustomers(
                                selectedDate,
                                selected
                              );
                              setTabledata(sample.data);
                              setPaginationTotal(
                                sample.total ? Math.ceil(sample.total / 7) : 1
                              );
                              console.log(
                                "all customer  data :- ",
                                sample.data
                              );
                            };
                            fetchData();
                            toast.success("Customer delete successfully ");
                          } else {
                            toast.error(
                              "Something went wrong please try again "
                            );
                          }
                        })();
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : tableData === null ? (
            <tr>
              <td colSpan="7" className="py-10 h-84">
                <div className="flex items-center justify-center gap-2 w-full text-red-400 text-lg">
                  <span className="font-semibold">No Data Found</span>
                </div>
              </td>
            </tr>
          ) : (
            <Loading />
          )}
        </table>
      </div>

      {!searchId && tableData?.length > 0 && paginationTotal > 1 ? (
        <div className="justify-center mt-5 align-center flex flex-row">
          <button
            className="mr-5 text-sm border px-2 w-25 py-2 bg-green-400 hover:bg-[#019D6D] rounded-full"
            onClick={() => {
              if (selected > 1) setselected(selected - 1);
            }}
          >
            Previous
          </button>

          <div className="flex items-center">
            {Array.from({ length: paginationTotal }, (_, i) => (
              <div
                className={`px-4 py-2 hover:bg-green-400 rounded-full ${
                  selected === i + 1
                    ? "font-bold text-lg"
                    : "font-light text-sm"
                }`}
                key={i + 1}
                onClick={() => {
                  setselected(i + 1);
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <button
            className="text-sm border px-2 w-25 py-2 bg-green-400 hover:bg-[#019D6D] rounded-full"
            onClick={() => {
              if (selected < paginationTotal) setselected(selected + 1);
            }}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}

      {/* Popup Modals */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg relative border border-gray-300">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <CustomerForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              setShowForm={setShowForm}
              formType={"Add"}
              CustomerDetails={"Customer"}
            />
          </div>
        </div>
      )}

      {showForm2 && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl  max-w-xl shadow-lg relative border border-gray-300">
            <div className="bg-gray-100 p-4 rounded-2xl w-fit text-sm font-medium text-black">
              <button
                onClick={() => setShowForm2(false)}
                className="absolute top-2 right-2  text-gray-500 hover:text-black text-xl"
              >
                &times;
              </button>
              {devices.length != 0 ? (
                devices.map((device, index) => (
                  <div key={index} className="flex justify-between gap-8 mb-1">
                    <span>{device}</span>
                  </div>
                ))
              ) : (
                <div> No Device Found</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* popup model 2  */}
      {showForm3 && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg relative border border-gray-300">
            <button
              onClick={() => setShowForm3(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <CustomerForm
              formData={formData3}
              setFormData={setFormData3}
              onSubmit={handleSubmit3}
              setShowForm={setShowForm3}
              CustomerDetails={"Customer"}
              formType={"Update"}
            />
          </div>
        </div>
      )}

      {showForm4 && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg relative border border-gray-300">
            <button
              onClick={() => setShowForm4(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <div>
              <div className="flex  items-center justify-center align-center p-10">
                <div className="flex flex-col justify-start items-center">
                  <p className="mb-5">
                    User Name :-{" "}
                    {Object.keys(Customerdetails).length !== 0
                      ? Customerdetails.customername
                      : "customer details Not found"}
                  </p>
                  <p>
                    Password is :-{" "}
                    {Object.keys(Customerdetails).length !== 0
                      ? Customerdetails.password
                      : "password details Not found"}
                  </p>
                </div>
              </div>
              <div className="flex  items-center justify-center align-center mx-3 mb-5 mt-1">
                <button
                  className=" mr-30 w-50 p-3 bg-red-300 hover:bg-white border rounded-lg"
                  onClick={() => setShowForm4(false)}
                >
                  Cancel
                </button>
                <button
                  className="p-3  w-50  bg-green-300 hover:bg-white border rounded-lg"
                  onClick={() => {
                    setShowForm4(false);
                    (async () => {
                      const sample = await getAllIndependentCustomers(
                        selectedDate,
                        selected
                      );
                      if (sample.data.length != 0) {
                        setTabledata(sample.data);
                        setPaginationTotal(
                          sample.total ? Math.ceil(sample.total / 7) : 1
                        );
                        console.log("all customer  data :- ", sample.data);
                      } else {
                        setTabledata(null);
                        setPaginationTotal(0);
                      }
                    })();
                  }}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        toastStyle={{ fontSize: "18px", textAlign: "center" }}
        className="custom-toast-container"
      />
    </div>
  );
};

export default CustomerDashboardForDealer;
