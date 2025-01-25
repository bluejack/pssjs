
import request from './request.js';

import { Ship } from './types.js';

import { tkn } from './pss-auth.js';

export default (() => {
  async function for_user(userId : number) : Promise<Ship | null> {
    const accessToken = tkn();
    const params = {
      userId: userId.toString(),
      accessToken
    };
    const res = await request.get('ShipService', 'InspectShip2', params);
    if (!res || res['ERR']) return null;
    const ship = res['ShipService']['InspectShip']['Ship'];
    return { 
      level: ship.ShipLevel,
      power: ship.PowerScore
    }
  }

  return {
    for_user
  }
})();
