
import request from './request.js';

import { pss_datetime } from './utils.js';

// import { Ship } from './types.js';

export default (() => {
  async function for_user(userId : string, accessToken : string) : Promise<[any]> {
    const params = {
      accessToken,
      userId,
      clientDateTime: pss_datetime()
    };
    const res = await request.get('ShipService', 'GetShipByUserId', params);
    console.log(res);
    return res;
  }

  return {
    for_user
  }
})();
