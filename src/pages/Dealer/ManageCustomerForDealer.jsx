import React from 'react'
import {CustomerDashboardForDealer,Sidebar} from "../../components/index.js";

function ManageCustomerForDealer() {
    return (
        <div className="flex h-screen bg-green-50 w-full max-w-screen overflow-hidden">
        {/* Fixed Sidebar with Full Height */}
        <Sidebar className="h-screen fixed left-0 top-0 w-24" />
    
        {/* Main Content with left margin to accommodate Sidebar */}
        <div className="w-full  overflow-auto">
            <CustomerDashboardForDealer />
        </div>
        </div>
  )
}

export default ManageCustomerForDealer;