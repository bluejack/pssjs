

export interface Player {
  id: number,
  name: string,
  trophies: number,
  max_trophies: number,
  rank: string,
  stars: number,
  fleet: string,
}

export interface Ship {
  level: number,
  power: number
}

export interface Fleet {
  name: string,
  members: number,
  trophies: number
}

export interface FleetService {
  by_ranking: (skip : number, limit: number ) => Promise<[Fleet] | null>
}

export interface RequestService {
  get: ( service : string, command : string, params : Record<string, string>) => Promise<Record<string, string | number>>,
  post: ( service : string, command : string, params : any) => Promise<any>
}

export interface PlayerService {
  search: ( searchString : string) => Promise<[Player]>
}

export interface ShipService {
  for_user: ( userId : number ) => Promise<any>
}

