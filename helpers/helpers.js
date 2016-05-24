import axios from 'axios';
import fs from 'fs';
import path from 'path';
import Champion from '../schemas/champions';
import Match from '../schemas/matches';

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

function getSummonerId(name) {
  summonerByName.get('/' + name.toString())
  .then((res) => {
    console.log(res.data);
  })
  .catch((res) => {
    if (res instanceof Error) {
      // Something in request triggered an error
      console.log('Error', res.message);
    } else {
      // request made but not 2xx status code
      console.log(res.data, res.status, res.headers, res.config);
    }
  });
}

function getMatchList(id) {
  matchList.get('/' + id)
  .then((res) => {

    const matchListTeam3x3 = res.data.matches.filter((match) => {
      return match.queue === 'RANKED_TEAM_3x3';
    });

    const matchListSolo5x5 = res.data.matches.filter((match) => {
      return match.queue === 'TEAM_BUILDER_DRAFT_RANKED_5x5';
    });

  })
  .catch((res) => {
    if (res instanceof Error) {
      // Something in request triggered an error
      console.log('Error', res.message);
    } else {
      // request made but not 2xx status code
      console.log(res.data, res.status, res.headers, res.config);
    }
  });
}

function getMatch(id) {
  // make sure the match is not already in the database

  singleMatch.get('/' + id)
  .then((res) => {
    // check if the match already exists in the match database
    // go through the champions in the match and check if each champion won or lost
    // add that number to the champion database
    // add that match to the match database ?
    let participants = res.data.participants;
    let participantIdentities = res.data.participantIdentities;


  })
  .catch((res) => {
    if (res instanceof Error) {
      // Something in request triggered an error
      console.log('Error', res.message);
    } else {
      // request made but not 2xx status code
      console.log(res.data, res.status, res.headers, res.config);
    }
  })
}

export default {
  getSummonerId: getSummonerId,
  getMatchList: getMatchList,
  getMatch: getMatch
};