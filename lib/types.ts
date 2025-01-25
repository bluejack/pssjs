

export interface Player {
  id: number,
  name: string,
  trophies: number,
  max_trophies: number,
  rank: string,
  stars: number,
  fleet: string,
}

export interface RequestService {
  get: ( service : string, command : string, params : Record<string, string>, auth_token? : string ) => Promise<Record<string, string | number>>,
  post: ( service : string, command : string, params : Record<string, string>, auth_token? : string ) => Promise<Record<string, string | number>>
}

export interface PlayerService {
  search: ( searchString : string) => Promise<[Player]>
}

export interface ShipService {
  for_user: ( authToken : string, userId : string ) => Promise<any>
}

