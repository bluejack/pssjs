
import request from './request.js';

import { Player } from './types.js';

export default (() => {

  async function search(searchString : string) : Promise<[any]> {
    const res = await request.get('UserService', 'SearchUsers', { searchString });
    const users = res['UserService']['SearchUsers']['Users']['User'];
    return users.reduce((acc : [Player], user : any) => {
      acc.push({
        id: parseInt(user.Id),
        name: user.Name,
        trophies: parseInt(user.Trophy),
        max_trophies: parseInt(user.HighestTrophy),
        rank: user.AllianceMembership,
        stars: user.AllianceScore ? parseInt(user.AllianceScore) : 0,
        fleet: user.AllianceName || ""
      })
      return acc;
    },[])
  }

  return {
    search
  }
})();
