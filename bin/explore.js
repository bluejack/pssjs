import { PSSClient } from '../dist/index.js';
import minimist from 'minimist';

function pause() {
  return new Promise(resolve => setTimeout(resolve, 5000));
}

async function search_user(cli, args) {
  if (args._.length <= 0) {
    console.log("User name to search is required for this operation.");
    return;
  }


  for (const idx in args._) {
    const uname = args._[idx];
    const users = await cli.players.search(uname)
    for (const idx in users) {
      const user = users[idx];
      console.log(
`----- USER: ${user.name}
     Fleet: ${user.fleet}
  Trophies: ${user.trophies}
  Max Trph: ${user.max_trophies}
     Stars: ${user.stars}`);

      const ship = await cli.ships.for_user(user.id);
      if (ship) {
        console.log(
`     Level: ${ship.level}
     Power: ${ship.power}`)
      } else {
        console.log("     No Ship!?");
      }
    }
  }
}

async function list_fleets(cli, args) {
  if (args.r) {
    const res = await cli.fleets.by_ranking(0, 100);
    for (const idx in res) {
      console.log(
`${idx} - FLEET: ${res[idx].name}
   Members: ${res[idx].members}
  Trophies: ${res[idx].trophies}
`        
      )
    }
  } else {
    console.log("Fleets requires a parameter.");
    usage();
  }
}

const commands = {
  user: search_user,
  fleets: list_fleets
}

function usage() {
  console.log(
`node explore.js 
  Possible Commands:
    -c user <name1 name2...> : Search users
    -c fleets -r             : fleets by overall rank
`)
}

async function main() {
  const args = minimist(process.argv.slice(2));
  const cli = new PSSClient();
  if (! await cli.connect()) {
    console.log("Could not authenticate for this session.");
  } else {
    if (commands[args.c]) {
      console.log("BEGIN!");
      return commands[args.c](cli, args);
    } else {
      return usage();
    }
  }
}


main().then(() => {
  console.log("FINIS.");
});

