import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_KEY = fs.readFileSync(path.join(__dirname, '../private/api_key.txt')).toString();

const summonerByName = axios.create({
  baseURL: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
  params: {
    api_key: API_KEY
  }
});

const matchList = axios.create({
  baseURL: 'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/',
  params: {
    api_key: API_KEY,
    seasons: 'SEASON2016'
  }
});

const singleMatch = axios.create({
  baseURL: 'https://na.api.pvp.net/api/lol/na/v2.2/match/',
  params: {
    api_key: API_KEY
  }
});

// return a promise with summoner info
function getSummonerId(name) {
  return new Promise((resolve, reject) => {
    summonerByName.get('/' + name.toString())
    .then((response) => {
      resolve(response.data);
    })
    .catch((response) => {
      reject(response);
    });
  });
}

// return a promise with matchlist of a summoner
function getMatchList(id) {
  return new Promise((resolve, reject) => {
    matchList.get('/' + id)
    .then((response) => {
      resolve(response.data);
    })
    .catch((response) => {
      reject(response);
    });
  });
}

// return a promise with the match info
function getMatch(id) {
  return new Promise((resolve, reject) => {
    singleMatch.get('/' + id)
    .then((response) => {
      resolve(response.data);
    })
    .catch((response) => {
      reject(response);
    })
  });
}

export default {
  getSummonerId: getSummonerId,
  getMatchList: getMatchList,
  getMatch: getMatch
};