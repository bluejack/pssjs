
// @ts-ignore
import strftime from 'strftime';

const PSS_DATETIME_FORMAT_ISO = "%Y-%m-%dT%H:%M:%S";

export function pss_datetime() : string {
  return strftime.timezone(0)(PSS_DATETIME_FORMAT_ISO, new Date());
};
