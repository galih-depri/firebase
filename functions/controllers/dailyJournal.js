const admin = require('firebase-admin');
const firebaseInit = require('../config/firebaseInit')
// Firebase app init


const db = admin.firestore();


module.exports = {

    async create(req, res) {
        try {
            const docRef = db.collection('dailyJournalEntries').doc();
            const data = req.body
            
    
            await docRef.set(data, {merge: true});
    
            res.status(201).json({
                message: 'Successfully created!',
            })
        } 
        
        catch(err) {
            return res.status(400).json('Opps! Something went wrong!', err.message)
        }
    },

    async getJournalEntry (req, res) {
        try {
            const client_id = req.params.id;
            const document = db.collection('dailyJournalEntries').doc(`${client_id}`);

            const client = await document.get();

            const response = client.data()
            return res.status(200).json(response)
        }

        catch(err) {
            return res.status(400).json(err.message);
        }
    },

    async updateEntry (req, res) {
        try {
            const client_id = req.params.id
            const data = req.body
            const document = db.collection('dailyJournalEntries').doc(`${client_id}`);
            
            await document.update(data)
        
            res.status(200).json({message: `Entry with ID ${client_id} has successfully been updated`}); 
        }

        catch(err) {
            return res.status(res.statusCode).json({status: 'failed', error: [err.message]});
        }
    },
    
    async deleteEntry (req, res) {
        try {
            const client_id = req.params.id
            const document = db.collection('dailyJournalEntries').doc(`${client_id}`);
            
            await document.delete()
    
            res.status(200).json({message: `Entry with ID ${client_id} has been deleted`}); 
        }
        
        catch(err) {
            return res.status(res.statusCode).json({status: 'failed', error: [err.message]});
        }
    }
    
}