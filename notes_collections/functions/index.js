const functions = require('firebase-functions');
const express = require('express');
const router = express();
const sheebaNotes = require('./controllers/sheebaNotes');
const consultantNotes = require('./controllers/consultantNotes');
const adminNotes = require('./controllers/adminNotes')

// Sheeba Notes API
router.post('/notes/sheeba', sheebaNotes.create);
router.get('/notes/sheeba/:id', sheebaNotes.getNote);
router.delete('/notes/sheeba/:id', sheebaNotes.deleteEntry);

// Consultant Notes API
router.post('/notes/consultant', consultantNotes.create);
router.get('/notes/consultant/:id', consultantNotes.getNote);
router.delete('/notes/consultant/:id', consultantNotes.deleteEntry);

// Admin Notes API
router.post('/admin/notes', adminNotes.create);
router.get('/admin/notes/:id', adminNotes.getNote);
router.delete('/admin/notes/:id', adminNotes.deleteEntry);

exports.apiNotes = functions.https.onRequest(router);
