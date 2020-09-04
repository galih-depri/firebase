const admin = require('firebase-admin');
const firebaseInit = require('../config/firebaseInit')
const short = require('short-uuid');
const db = admin.firestore();


module.exports = {

    async create (req, res) {
        try {
            // Creating uuid as the document ID

            let uuid = []
            for (let i = 0; i < 10; i++) {
                const uniqueId = short.generate();
                uuid.push(uniqueId)    
            }

            const doc_id = uuid[0].toString()

            const docRef = db.collection('consultantNotes').doc(doc_id);

            await docRef.set({
                dateCreated: Date(),
                noteContent: {
                    subject: req.body.noteContent.subject,
                    message: req.body.noteContent.message,
                    fileURL: req.body.noteContent.fileURL,
                },
                clientID: doc_id
            },
            {
                merge: true
            })

            res.status(201).json({message: 'Entries successfully created!'})
        }
        catch(err) {
        return res.status(400).json({
            message: 'Opps! Something went wrong!', 
            err: err.message
        })
        }
    },

    async getNote (req, res) {
        try {
            const id = req.params.id;
            const docRef = db.collection('consultantNotes').doc(`${id}`);

            const searchResult = await docRef.get();

            const response = searchResult.data();

            return res.status(200).json(response)
        }

        catch(err) {
            return res.status(400).json({
                message: 'Opps! Something went wrong!', 
                err: err.message
            })
            }
    },

    async deleteEntry (req, res) {
        try {
            const id = req.params.id;
            const docRef = db.collection('consultantNotes').doc(`${id}`);
            
            await docRef.delete();

            res.status(200).json({message: `Note with ID ${id} has been deleted`}); 

        }

        catch(err) {
            return res.status(400).json({
                message: 'Opps! Something went wrong!', 
                err: err.message
            })
            }
    }
}