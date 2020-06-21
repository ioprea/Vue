const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const encKey = '0123456789123456'
const nodemailer = require('nodemailer')
const mailConf = require('./config')
app.use(bodyParser.urlencoded())

app.use(bodyParser.json())

var serviceAccount = require('./v-location-firebase-adminsdk-3kd7s-e06d98c1a7.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://v-location.firebaseio.com'
  //   storageBucket: "gs://neut-5ef84.appspot.com/"
})

const auth = admin.auth()
const db = admin.firestore()

const validateFirebaseIdToken = async (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token')

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    )
    res.status(403).send('Unauthorized')
    return
  }

  let idToken
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    console.log('Found "Authorization" header')
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else if (req.cookies) {
    console.log('Found "__session" cookie')
    // Read the ID Token from cookie.
    idToken = req.cookies.__session
  } else {
    // No cookie
    res.status(403).send('Unauthorized')
    return
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken)
    console.log('ID Token correctly decoded', decodedIdToken)
    req.user = decodedIdToken
    next()
    return
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error)
    res.status(403).send('Unauthorized')
    return
  }
}

app.use(cors({ origin: true }))

//should use cred checking in the future
// app.use('/users', validateFirebaseIdToken)

// ============================ Email service =============================
const gmailEmail = mailConf.email
const gmailPassword = mailConf.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})
const APP_NAME = 'Events Reporter'
async function sendWelcomeEmail (email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  }

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`
  mailOptions.html =
    '<div style="display: block; text-align: center;"><h3>Welcome to Events Reporter!🚀</h3><p>Hope you enjoy the app🎉</p></div>'
  await mailTransport.sendMail(mailOptions)
  console.log('New welcome email sent to:', email)
  return null
}

async function sendNotificationEmail (email, link) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  }

  // The user subscribed to the newsletter.
  mailOptions.subject = `New event added!`
  mailOptions.html =
    `<div style="display: block; text-align: center;"><h3>New event has been added! View it here ${link} 🚀✅</h3></div>`
  await mailTransport.sendMail(mailOptions)
  console.log('New welcome email sent to:', email)
  return null
}

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email // The email of the user.
  const displayName = user.displayName // The display name of the user.
  // [END eventAttributes]

  return sendWelcomeEmail(email)
})

exports.api = functions.https.onRequest(app)
exports.deleteUser = functions.auth.user().onDelete(user => {
  db.collection('users')
    .doc(user.uid)
    .delete()
    .then(console.log('Delete user successfully'))
    .catch(console.log('Error deleting user', user))
})

exports.notifyNewEvent = functions.firestore
  .document('events/{id}')
  .onCreate(async (snap, context) => {
    console.log('snap ->', snap)
    console.log('context ->', context)
    const snapshot = await db.collection('users').get()
    snapshot.docs.forEach(doc => {
        let data = doc.data()
        sendNotificationEmail(data.email, `https://v-location.web.app/event/${context.params.id}`)
    })
    // let dataBefore = snap.before.data().applicants || []
    // let dataAfter = snap.after.data().applicants || []
    // if(dataAfter.length > dataBefore.length) {
    //   let applicant = dataAfter.pop()
    //   let jobPoster = snap.after.data().companyId
    //   console.log('applicant ', applicant, jobPoster);
    //   db.collection('users').doc(applicant.id).get()
    //     .then(snapshot => {
    //       console.log('applicant snapshot', snapshot.data());
    //       if(snapshot && snapshot.data().email) {
    //         sendConfirmationEmail(snapshot.data().email)
    //       }
    //     })
    //   db.collection('users').doc(jobPoster).get()
    //     .then(snapshot => {
    //       console.log('poster snapshot', snapshot.data());
    //       if(snapshot && snapshot.data().email && snapshot.data().notifications) {
    //         sendNotificationEmail(snapshot.data().email, `https://stud-connect.web.app/details/${snap.after.id}`)
    //       }
    //     })
    //   return 'success'
    // }
    return 'success'
  })
