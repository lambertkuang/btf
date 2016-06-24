import express from 'express';
import path from 'path';
import compression from 'compression';
import React from 'react';
import {match, RouterContext} from 'react-router';
import routes from './components/routes';
import {renderToString} from 'react-dom/server';
import mongoose from 'mongoose';
import helper from './helpers/helpers';
import {fillEmUp, getMoreMatches} from './helpers/workers';
import {calculateStats, calculate3v3Stats} from './helpers/stats';
import Match from './schemas/matches';
import {apiApp} from './api';
import './helpers/getSprites';

const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, 'public'), {index: false}));

app.use('/api', apiApp);

app.get('*', (req, res) => {
  match({routes: routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props}/>);
      res.send(renderPage(appHtml));
    } else {
      res.status(404).send('Not found');
    }
  });
});

function renderPage(appHtml) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>lol</title>
      <link rel="stylesheet" href="/index.css">
    </head>
    <body>
      <div id="app">${appHtml}</div>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `;
}

const PORT = process.env.PORT || 8080;
const localuri = 'mongodb://localhost/banthesefools';
const uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || localuri;

mongoose.connect(uristring, (err, res) => {
  if (err) {
    console.log('Error connecting to ' + uristring + ' ' + err);
  } else {
    console.log('Successful connecting to ' + uristring);
  }
});

// fillEmUp();
// getMoreMatches();

app.listen(PORT, () => {
  console.log('Production server running at localhost:' + PORT);
});