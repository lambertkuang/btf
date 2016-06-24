import fs from 'fs';
import request from 'request';

const url = 'http://ddragon.leagueoflegends.com/cdn/6.12.1/img/sprite/';
const sheets = [
  'champion0.png',
  'champion1.png',
  'champion2.png',
  'champion3.png',
  'champion4.png'
];

sheets.forEach((sheet) => {
  request(url + sheet, {encoding: 'binary'}, (err, res, body) => {
    fs.writeFile('public/images/' + sheet, body, 'binary', (err) => {
      if (err) {
        throw err;
      }
    });
  })
});
