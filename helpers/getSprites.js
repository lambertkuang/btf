import fs from 'fs';
import request from 'request';
import path from 'path';

const API_KEY = fs.readFileSync(path.join(__dirname, '../private/api_key.txt')).toString();
const url = 'http://ddragon.leagueoflegends.com/cdn/6.12.1/img/sprite/';
const versionUrl = `https://global.api.pvp.net/api/lol/static-data/na/v1.2/versions?api_key=${API_KEY}`;
const sheets = [
  'champion0.png',
  'champion1.png',
  'champion2.png',
  'champion3.png',
  'champion4.png'
];

request.get(versionUrl, function(err, res, body) {
  if (err) {
    console.log('Error getting version: ', err);
    return;
  }
  if (body) {
    let version = JSON.parse(body).shift();
    let url = `http://ddragon.leagueoflegends.com/cdn/${version}/img/sprite/`;

    sheets.forEach((sheet) => {
      request(url + sheet).pipe(fs.createWriteStream(path.join('public/images', sheet)));
    });
  }
});
