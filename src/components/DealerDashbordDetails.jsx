import React, { useEffect, useState } from "react";
import { CustomerForm, Toggle, Loading } from "./index.js";
import { Pencil, ChevronLeft, Calendar, Search } from "lucide-react";
import { ToastContainer, toast, Slide } from "react-toastify";

// import api
import {blockCustomer} from "../API/DEALERSIDE_API/Api.js"

import {
  
  deleteCustomerForDealer,
  getDealerCustomer,
  getDealerCustomerByName,
  registerCustomerForDealer,
  updateCustomerForDealer,
} from "../API/api.js";

const DealerDashboard = ({ setDealer, dealer, dealername }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [selected, setselected] = useState(1);
  const [showForm4, setShowForm4] = useState(false);
  const [toggle, settoggle] = useState([]);
  const [toggle2, setToggle2] = useState([]);
  const [searchId, setSearchId] = useState(false);
  const [Customerdetails, setCustomerdetails] = useState({});
  const [searchcustomerdata, setSearchcustomerdata] = useState({});
  const [customerId, setCustomerId] = useState("");
  const [allCustomerUnderDealerdata, setallCustomerUnderDealerdata] = useState(
    []
  );
  const [paginationTotal, setPaginationTotal] = useState(1);

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
    setallCustomerUnderDealerdata([]);
    (async function () {
      const data = await getDealerCustomer(dealer, selectedDate, selected);
      if (data.data?.length != 0) {
        console.log(" All customer data :-", data.data);
        setPaginationTotal(data.total ? Math.ceil(data.total / 7) : 1);
        setallCustomerUnderDealerdata(data.data);
      } else {
        setPaginationTotal(0);
        setallCustomerUnderDealerdata(null);
      }
    })();
  }, [selected, selectedDate]);

  useEffect(() => {
    setallCustomerUnderDealerdata([]);
    setToggle2([]);
    settoggle([]);
    setSearchcustomerdata({});
    setselected(1);
  }, [selectedDate]);

  useEffect(() => {
    setallCustomerUnderDealerdata([]);
    setToggle2([]);
  }, [selected]);

  const handleSubmit = async () => {
    console.log("Customer Data :", formData);
    console.log("dealer id  is : -", dealer.toString());
    const data = {
      name: formData.customerName,
      email: formData.email,
      phone: formData.contactNumber,
      role: "customer",
      city: formData.addressCity,
      state: formData.addressState,
      dealerId: dealer,
    };

    console.log("customer id data  is :-", data);
    const result = await updateCustomerForDealer(customerId, data);
    // console.log("API Response:", result);
    if (result.status == 200) {
      console.log("update customer api data :- ", result.data);
      if (searchTerm.trim() != "") {
        async function abc() {
          const data = await getDealerCustomerByName(dealer, searchTerm);
          if (Object.keys(data).length !== 0) {
            setSearchId(true);
            setSearchcustomerdata(data.data);
          }
          console.log("response come from backend for id ", data);
        }
        abc();
      } else {
        (async function () {
          const data = await getDealerCustomer(dealer, selectedDate, selected);
          if (data.data?.length != 0) {
            console.log(" All customer data :-", data.data);
            setPaginationTotal(data.total ? Math.ceil(data.total / 7) : 1);
            setallCustomerUnderDealerdata(data.data);
          } else {
            setPaginationTotal(0);
            setallCustomerUnderDealerdata(null);
          }
        })();
      }
      toast.success("Customer updated  successfully");

      // setCustomerdetails({
      //   customername : formData3.customerName,
      //   password : result.password
      // })
      setFormData({
        customerName: "",
        email: "",
        contactNumber: "",
        addressState: "",
        addressCity: "",
      });
      setShowForm(false);
      // setShowForm4(true)
    } else {
      //       console.log(result.response.data.message
      // ,"is error ")
      toast.error(result.response.data.message);
    }
    setFormData({
      customerName: "",
      email: "",
      contactNumber: "",
      addressState: "",
      addressCity: "",
    });
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

    // console.log("data is :-",data);
    const result = await registerCustomerForDealer(dealer, data);
    // console.log("API Response:", result);
    if (result.message == "Customer created successfully") {
      console.log("add customer api data :- ", result);

      if (searchTerm.trim() != "") {
        async function abc() {
          const data = await getDealerCustomerByName(dealer, searchTerm);
          if (Object.keys(data).length !== 0) {
            setSearchId(true);
            setSearchcustomerdata(data.data);
          }
          console.log("response come from backend for id ", data);
        }
        abc();
      } else {
        (async function () {
          const data = await getDealerCustomer(dealer, selectedDate, selected);
          if (data.data?.length != 0) {
            console.log(" All customer data :-", data.data);
            setPaginationTotal(data.total ? Math.ceil(data.total / 7) : 1);
            setallCustomerUnderDealerdata(data.data);
          } else {
            setPaginationTotal(0);
            setallCustomerUnderDealerdata(null);
          }
        })();
      }

      toast.success("Customer registered successfully");

      setCustomerdetails({
        customername: formData3.customerName,
        password: result.password,
      });
      setFormData3({
        customerName: "",
        email: "",
        contactNumber: "",
        addressState: "",
        addressCity: "",
      });
      setShowForm3(false);
      setShowForm4(true);
    } else {
      //       console.log(result.response.data.message
      // ,"is error ")
      toast.error(result.response.data.message);
    }
    setFormData3({
      customerName: "",
      email: "",
      contactNumber: "",
      addressState: "",
      addressCity: "",
    });
  };

  const devices = Array.from({ length: 10 }, (_, i) => ({
    name: "Device Name",
    id: "123456789098765",
  }));

  useEffect(() => {
    if (searchcustomerdata && Object.keys(searchcustomerdata).length > 0) {
      const status = searchcustomerdata.map((device, index) => {
        return {
          index: index,
          statusdata: device.isBlocked,
        };
      });
      settoggle(status);
    }
  }, [searchcustomerdata]);

  useEffect(() => {
    console.log("toggle data is  for toggle2:- ", toggle2);
  }, [toggle2]);

  useEffect(() => {
    async function abc() {
      if (
        allCustomerUnderDealerdata &&
        Object.keys(allCustomerUnderDealerdata).length > 0
      ) {
        console.log("useeffect is called ");
        const status = await allCustomerUnderDealerdata.map((device, index) => {
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
  }, [allCustomerUnderDealerdata]);

  // const customers = Array(8).fill({
  //   name: "Customer Name",
  //   email: "user@gmail.com",
  //   contact: "+91 98XXXXXXXX",
  //   addedOn: "21/04/24",
  //   devices: 10,
  //   address: "City, State Name",
  //   active: true,
  // });

  return (
    <div className="p-6 bg-green-50">
      <div
        className="flex mb-4"
        onClick={() => {
          setDealer("");
        }}
      >
        <ChevronLeft className="h-10 w-10  cursor-pointer" />
        <h2 className="text-2xl font-semibold ">
          {dealername ? dealername : "Dealer Name"}
        </h2>
      </div>
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
            />
            <button
              className="text-sm rounded-full hover:bg-green-300 bg-white px-3 py-1"
              onClick={() => {
                if (searchTerm != "") {
                  async function abc() {
                    const data = await getDealerCustomerByName(
                      dealer,
                      searchTerm
                    );
                    if (Object.keys(data.data).length !== 0) {
                      setSearchId(true);
                      setSearchcustomerdata(data.data);
                    } else {
                      toast.warn(
                        "No such Customer name found please enter correct name"
                      );
                    }
                    console.log("response come from backend for id ", data);
                  }
                  abc();
                }
              }}
            >
              search
            </button>
          </div>

          <button
            className="bg-[#019D6D] text-white text-sm px-4 py-2 rounded-lg"
            onClick={() => setShowForm3(true)}
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
          {Object.keys(searchcustomerdata).length !== 0 ? (
            Object.keys(searchcustomerdata).length !== 0 ||
            Number(toggle.length) !== 0 ? (
              <tbody>
                {searchcustomerdata.map((customer, index) => (
                  <tr
                    key={index}
                    className={` hover:bg-gray-50 ${
                      toggle.length != 0
                        ? toggle[index]?.statusdata
                          ? "text-gray-400"
                          : ""
                        : ""
                    } `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.devicesSold}
                    </td>
                    <td className="px-6 py-4 w-64 break-words">{`${customer.address.city} , ${customer.address.state}`}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
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
                          setCustomerId(customer.customerId);
                          setShowForm(true);
                        }}
                      />

                      <button
                        onClick={() => {
                          (async function () {
                            const response = await deleteCustomerForDealer(
                              customer.customerId,
                              dealer
                            );
                            if (response) {
                              if (searchTerm.trim() != "") {
                                async function abc() {
                                  const data = await getDealerCustomerByName(
                                    dealer,
                                    searchTerm
                                  );
                                  if (Object.keys(data).length !== 0) {
                                    setSearchId(true);
                                    setSearchcustomerdata(data.data);
                                  }
                                  console.log(
                                    "response come from backend for id ",
                                    data
                                  );
                                }
                                abc();
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
            ) : (
              <div className="flex justify-center items-center">
                No Data....
              </div>
            )
          ) : (allCustomerUnderDealerdata &&
              allCustomerUnderDealerdata != null &&
              allCustomerUnderDealerdata?.length != 0) ||
            Number(toggle2?.length) !== 0 ? (
            <tbody>
              {console.log("allCustomerUnderDealerdata is called")}
              {console.log("toggle data :", toggle2)}
              {console.log("toggle length  :", toggle2.length)}
              {allCustomerUnderDealerdata.map((customer, index) => (
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.devicesSold}
                  </td>
                  <td className="px-6 py-4 w-64 break-words">
                    {`${customer.address.city} , ${customer.address.state}`}
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
                        setCustomerId(customer.customerId);
                        setShowForm(true);
                      }}
                    />

                    <button
                      onClick={() => {
                        (async function () {
                          const response = await deleteCustomerForDealer(
                            customer.customerId,
                            dealer
                          );
                          if (response) {
                            (async function () {
                              const data = await getDealerCustomer(
                                dealer,
                                selectedDate,
                                selected
                              );
                              if (data.data?.length != 0) {
                                console.log(" All customer data :-", data.data);
                                setPaginationTotal(
                                  data.total ? Math.ceil(data.total / 7) : 1
                                );
                                setallCustomerUnderDealerdata(data.data);
                              }
                            })();
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
          ) : allCustomerUnderDealerdata == null ? (
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
      {!searchId && paginationTotal > 1 ? (
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
            />
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
              formType={"Add"}
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
                  onClick={() => setShowForm4(false)}
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

export default DealerDashboard;
