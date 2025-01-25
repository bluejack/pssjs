
import fs from 'fs';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

import { PlayerService, ShipService } from './types.js';

import { auth } from './pss-auth.js';

import players from './players.js';
import ships from './ships.js';

const homedir = os.homedir();

export class PSSClient {

  device: string;
  auth_token: string;
  cfg_file: string = `${homedir}/.pss.cfg`;

  players: PlayerService = players;
  ships: ShipService = ships;

  constructor() {
    this.auth_token = "";
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

  async connect() : Promise<string> {

    console.log("Auth with ${this.device}");
    return await auth(this.device);

  }

}