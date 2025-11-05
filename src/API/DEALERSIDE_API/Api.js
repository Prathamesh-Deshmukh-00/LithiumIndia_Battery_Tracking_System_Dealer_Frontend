// DEALER SIDE API
import { addAlert } from "./addAlert.js";
import { addDeviceDealer } from "./addDeviceForDealer.js";
import { blockCustomer } from "./blockCustomer.js";
import { blockDevice } from "./blockDevice.js";
import { deleteAlert } from "./deleteAlert.js";
import { deleteAlertSetting } from "./deleteAlertSetting.js";
import { deleteCustomer } from "./deleteCustomer.js";
import { getAlertsByDeviceId } from "./getAlertsByDeviceId.js";
import { getAlertSettingsByName } from "./getAlertSettingsByName.js";
import { getAllAlerts } from "./getAllAlerts.js";
import { getAllAlertSettings } from "./getAllAlertSettings.js";
import { getAllDealerDevices } from "./GetAllDevices.js";
import { getAllIndependentCustomers } from "./getAllIndependentCustomers.js";
import { getDeviceByDeviceId } from "./getDeviceByDeviceId.js";
import { getDeviceSummary } from "./getDeviceSummary.js";
import { getIndependentCustomerByName } from "./getIndependentCustomerByName.js";
import { loginDealer } from "./loginDealer.js";
import { registerCustomer } from "./registerCustomer.js";
import { updateAlertSetting } from "./updateAlertSetting.js";
import { updateCustomer } from "./updateCustomer.js";
import { updateDealerDevice } from "./updateDealerDevice.js";




export {
         addAlert,
         addDeviceDealer, 
         blockCustomer,
         blockDevice,
         deleteAlert,
         deleteAlertSetting,
         deleteCustomer,
         getAlertsByDeviceId,
         getAlertSettingsByName,
         getAllAlerts,
         getAllAlertSettings,
         getAllDealerDevices,
         getAllIndependentCustomers,
         getDeviceByDeviceId,
         getDeviceSummary,
         getIndependentCustomerByName,
         loginDealer,
         registerCustomer,
         updateAlertSetting,
         updateCustomer,
         updateDealerDevice,
        };
