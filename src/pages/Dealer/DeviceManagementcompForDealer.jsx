import React, { useState } from 'react';
import { Sidebar, DeviceManagementForDealer, DeviceDetailsForDealer } from "../../components/index.js";

function DeviceManagementcompForDealer() {
  const [device, setDevice] = useState(true);
  const [devicedetailsdata ,setDevicedetailsdata] = useState({});

  return (
    <div className="flex h-screen bg-green-50 w-full max-w-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar className="h-screen fixed left-0 top-0 w-24" />
      
      {/* Main Content */}
      <div className="w-full  overflow-auto"> {/* Added ml-24 to offset sidebar */}
        {device ? (
          <DeviceManagementForDealer setDevicedetailsdata={setDevicedetailsdata} setDevice={setDevice} />
        ) : (
          <DeviceDetailsForDealer devicedetailsdata={devicedetailsdata} setDevice={setDevice} />
        )}
      </div>
    </div>  
  );
}

export default DeviceManagementcompForDealer;
