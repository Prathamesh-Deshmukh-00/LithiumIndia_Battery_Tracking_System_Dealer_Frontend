import React, { useEffect, useState } from 'react'
import {  Sidebar,DashboardDealer2,DashboardDealer} from "../../components/index.js";

// Import API 
import {getDeviceSummary} from "../../API/DEALERSIDE_API/Api.js";

function DealerDashbord() {

  const [dealerdata , setDealerdata ] = useState({});

  useEffect(()=>{
   ( async function () {
      const response = await getDeviceSummary();
      console.log("API response is :- ",response);
      setDealerdata(response);
    })();
  },[])

    const [device ,setDevice] = useState(false);

    return (
        <div className="flex h-full w-full max-w-screen overflow-hidden">
          {/* Fixed Sidebar */}
          <Sidebar className="h-screen fixed left-0 top-0 w-24" />
            {/* Main Content */}
  <div className=""></div>
  {
     device ? <DashboardDealer2 dealerdata={dealerdata}  setDevice={setDevice}/> : 
     <DashboardDealer dealerdata={dealerdata}  setDevice={setDevice}/>
  }
 

    </div>
  )
}

export default DealerDashbord;