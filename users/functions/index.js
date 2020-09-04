const functions = require('firebase-functions');
const express = require('express');
const app = express()
const firebase = require('firebase')
const firebaseConfig = require('./config/firebaseConfig')

//admin.initializeApp()
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()
app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        let { email, password, bio, consultant_id, home_address } = req.body

        if (!bio) 
            return res.status(400).json({
                status: 'failed', 
                message: 'Please input your short bio'
            })
        
        if(!consultant_id) 
            consultant_id = null

        const credentials = await auth.createUserWithEmailAndPassword(email, password);

        const uid = credentials.user.uid;
        

        await db.collection('users').doc(`${uid}`).set({
            clientId: uid,
            bio: bio,
            consultant_id: consultant_id
        });

        res.status(200).json({message: `User has successfully been created`}); 
    }
    catch(err) {
        return res.status(res.statusCode).json({status: 'failed', error: [err.message]});
    }
})

// Webhook for Calendly 
app.post('/hook', async (req, res) => {
    console.log(req.body)
    try {
        const docRef = db.collection('calendarBookings').doc()

        await docRef.set({
            dateCreated: req.body.payload.invitee.created_at,
            clientID: req.body.payload.questions_and_responses['1_response'],
            eventDetails: {
                eventName: req.body.payload.event_type.name,
                eventDate: req.body.payload.event.start_time
            }
        }, {merge: true})
        res.status(201).json({
            message: 'Successfully created!',
        })
    } catch(err) {
        return res.status(400).json('Opps! Something went wrong!', err.message)
    }
})  

exports.api = functions.https.onRequest(app);