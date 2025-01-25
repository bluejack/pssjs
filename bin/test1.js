import { PSSClient } from '../dist/index.js';

const cli = new PSSClient();
cli.connect().then(tkn => {
  cli.players.search('Keiretsu').then(users => {
    users.forEach(user => {
      console.log('USER');
      console.log(user);
      cli.ships.for_user(user.id, tkn).then(ship => {
        console.log(ship);
      });
    });
  });
});
