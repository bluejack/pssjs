
// @ts-ignore
import crypto from 'crypto';

import request from "./request.js";
import { pss_datetime } from "./utils.js";

const DEVICE_TYPE = "DeviceTypeAndroid";

function compute_checksum(device : string, salt: string, pss_time : string) : string {
  const hash_in = `${device}${pss_time}${DEVICE_TYPE}${salt}savysoda`;
  return crypto.createHash('md5').update(hash_in).digest("hex");
}

async function device_login(checksum : string, pss_time : string, device : string) : Promise<any> {
  const params = {
    "AccessToken": "00000000-0000-0000-0000-000000000000",
    "AdvertisingKey": "00000000-0000-0000-0000-000000000000",
    "Checksum": checksum,
    "ClientDateTime": pss_time,
    "DeviceKey": device,
    "DeviceType": DEVICE_TYPE,
    "IsJailBroken": "false",
    "LanguageKey": "en",
    "RefreshToken": "str",
    "Signal": "false",
    "UserDeviceInfo": {
      "ClientBuild": "int", 
      "ClientVersion": "str", 
      "DeviceName": "str", 
      "Locale": "str", 
      "OSBuild": "int", 
      "OsVersion": "str"
    }
  }
  const res = await request.post('UserService', 'DeviceLogin15', params );
  return res['UserService']['UserLogin']['accessToken'];
}


let access_token = "";

export function tkn() : string {
  return access_token;
}

export async function auth(device: string) : Promise<string | null> {
  const pss_time = pss_datetime();
  const salt = process.env.PSS_SALT || "";
  const checksum = compute_checksum(device, salt, pss_time);
  access_token = await device_login(checksum, pss_time, device);
  return access_token;
}
