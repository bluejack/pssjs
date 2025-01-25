
import request from './request.js';

import { Fleet } from './types.js';

export default (() => {
  async function by_ranking(skip: number = 0, limit: number = 50) : Promise<[Fleet] | null> {
    const params = {
      skip: skip.toString(),
      take: limit.toString()
    }
    const res = await request.get('AllianceService', 'ListAlliancesByRanking', params);
    if (!res || res['ERR']) return null;
    const f = res.AllianceService?.ListAlliancesByRanking?.Alliances?.Alliance;
    if (!f) return null;
    return f.reduce((acc : [Fleet], f : any) => {
      acc.push({
        name: f.AllianceName,
        members: f.NumberOfMembers,
        trophies: f.Trophy
      })
      return acc;
    },[]) 
  }

  return {
    by_ranking
  }
})();
