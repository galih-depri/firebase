const functions = require('firebase-functions');
const express = require('express');
const app = express();
const dailyJournal = require('./controllers/dailyJournal');
const clients = require('./controllers/client');
const keyJournal = require('./controllers/keyJournal');

// Clients API 
app.post('/client/create', clients.create);
app.get('/client/:id', clients.getClientDetail);
app.put('/client/:id', clients.updateClient);
app.delete('/client/:id', clients.deleteClient);

// Daily Journal Entries API
app.post('/daily-journal/create', dailyJournal.create);
app.get('/daily-journal/:id', dailyJournal.getJournalEntry);
app.put('/daily-journal/:id', dailyJournal.updateEntry);
app.delete('/daily-journal/:id', dailyJournal.deleteEntry);

// Key Journal Entries API
app.post('/key-journal/create', keyJournal.create);
app.get('/key-journal/:id', keyJournal.getEntry);
app.put('/key-journal/:id', keyJournal.updateEntry);
app.delete('/key-journal/:id', keyJournal.deleteEntry);


exports.api = functions.https.onRequest(app);