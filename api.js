import express from 'express';
import {calculateStats, calculate3v3Stats} from './helpers/stats';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_KEY = fs.readFileSync(path.join(__dirname, './private/api_key.txt')).toString();

const apiApp = express();

apiApp.get('/stats', (req, res, next) => {
  calculateStats((data) => {
    res.send(data);
  });
});

apiApp.get('/3v3', (req, res, next) => {
  calculate3v3Stats((data) => {
    res.send(data);
  });
});

apiApp.get('/names', (req, res, next) => {
  const champData = axios.create({
    baseURL: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion',
    params: {
      api_key: API_KEY
    }
  });
  champData.get('/')
  .then((results) => {
    res.send(results.data);
  })
  .catch((err) => {
    console.log('Error getting static data: ', err);
  });
})
export { apiApp };
