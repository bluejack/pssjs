
// @ts-ignore
import crypto from 'crypto';

import request from "./request.js";
import { pss_datetime } from "./utils.js";

const DEVICE_TYPE = "DeviceTypeAndroid";

/*
'7042c219-5fe3-4f61-8eea-d006070cfd852024-12-30T23:18:17DeviceTypeAndroid5343savysoda'
42ec486f814e327e6891f3be54e56938
*/
function compute_checksum(device : string, pss_time : string) : string {
  const hash_in = `${device}${pss_time}${DEVICE_TYPE}5343savysoda`;
  return crypto.createHash('md5').update(hash_in).digest("hex");
}

/*

        checksum: str,
        client_date_time: _datetime.datetime,
        device_key: str,
        device_type: _enums.DeviceType,
        access_token: str = None,
        advertising_key: str = None,
        client_build: int = None,
        client_version: str = None,
        device_name: str = None,
        is_jail_broken: bool = None,
        locale: str = None,
        os_build: int = None,
        os_version: str = None,
        refresh_token: str = None,
        signal: bool = None,

_UserServiceRaw.device_login_15(
            production_server,
            access_token or "00000000-0000-0000-0000-000000000000",
            advertising_key or "00000000-0000-0000-0000-000000000000",
            checksum,
            client_build or "",
            _utils.datetime.convert_to_pss_timestamp(client_date_time),
            client_version,
            device_key,
            device_name or "",
            str(device_type),
            _utils.convert.to_pss_bool(is_jail_broken or False),
            str(language_key) if language_key else None,
            locale or "",
            os_build or "",
            os_version or "",
            refresh_token,
            _utils.convert.to_pss_bool(signal or False),
            
            
  => 

  async def device_login_15(
    production_server: str,
    access_token: str,
    advertising_key: str,
    checksum: str,
    client_build: int,
    client_date_time: _datetime,
    client_version: str,
    device_key: str,
    device_name: str,
    device_type: str,
    is_jail_broken: bool,
    language_key: str,
    locale: str,
    os_build: int,
    os_version: str,
    refresh_token: str,
    signal: bool,
    **params,
) -> _UserLogin:
    params = {
        "AccessToken": access_token,
        "AdvertisingKey": advertising_key,
        "Checksum": checksum,
        "ClientBuild": client_build,
        "ClientDateTime": client_date_time,
        "ClientVersion": client_version,
        "DeviceKey": device_key,
        "DeviceName": device_name,
        "DeviceType": device_type,
        "IsJailBroken": is_jail_broken,
        "LanguageKey": language_key,
        "Locale": locale,
        "OSBuild": os_build,
        "OsVersion": os_version,
        "RefreshToken": refresh_token,
        "Signal": signal,
        **params,
    }
    content = _core.create_request_content(__DEVICE_LOGIN_15_REQUEST_CONTENT_STRUCTURE, params, "json")
    result = await _core.get_entities_from_path(
        ((_UserLogin, "UserLogin", False),), "UserService", production_server, DEVICE_LOGIN_15_BASE_PATH, "POST", request_content=content, response_gzipped=False, **params
    )
    return result

UserService/DeviceLogin15

{'AccessToken': '00000000-0000-0000-0000-000000000000', 
'AdvertisingKey': '00000000-0000-0000-0000-000000000000', 
'Checksum': '4eb0043fb2160d0c05400b1122395cf3', 
'ClientBuild': '', 
'ClientDateTime': '2024-12-30T23:24:02', 
'ClientVersion': None, 
'DeviceKey': '7042c219-5fe3-4f61-8eea-d006070cfd85', 
'DeviceName': '', 
'DeviceType': 'DeviceTypeAndroid', 
'IsJailBroken': 'false', 
'LanguageKey': 'en', 
'Locale': '', 
'OSBuild': '', 
'OsVersion': '', 
'RefreshToken': None, 'Signal': 'false'}

  */



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

export async function auth(device : string) : Promise<string> {
  const pss_time = pss_datetime();
  const checksum = compute_checksum(device, pss_time);
  console.log(checksum);
  return await device_login(checksum, pss_time, device);
}
