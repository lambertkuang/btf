import express from 'express';
import {calculateStats} from './helpers/stats';

const apiApp = express();

apiApp.get('/stats', (req, res, next) => {
  calculateStats((data) => {
    res.send(data);
  });
});

export { apiApp };