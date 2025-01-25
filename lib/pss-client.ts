
import fs from 'fs';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

import { 
  FleetService,
  PlayerService, 
  ShipService } from './types.js';

import { auth } from './pss-auth.js';

import players from './players.js';
import ships from './ships.js';
import fleets from './fleets.js';

const homedir = os.homedir();

export class PSSClient {

  device: string;
  cfg_file: string = `${homedir}/.pss.cfg`;

  players: PlayerService = players;
  ships: ShipService = ships;
  fleets: FleetService = fleets;

  constructor() {
    this.device = "";
    try {
      fs.accessSync(this.cfg_file, fs.constants.F_OK);
      const cfg_f = fs.readFileSync(this.cfg_file, { encoding: 'utf8', flag: 'r' });
      const cfg_o = JSON.parse(cfg_f);
      this.device = cfg_o.device;
    } catch (err) {
      this.device = uuidv4();
      fs.writeFileSync(this.cfg_file, JSON.stringify({device: this.device}));
    }
  }

  async connect() : Promise<boolean> {
    if(! await auth(this.device)) return false;
    return true;
  }

}