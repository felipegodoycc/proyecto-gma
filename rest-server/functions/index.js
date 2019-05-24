const functions = require('firebase-functions');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const mongooseConfig = { useNewUrlParser: true }

const mongouri = "mongodb+srv://test:test12345@cluster0-2vq26.gcp.mongodb.net/medicion?retryWrites=true"

mongoose.connect(mongouri,mongooseConfig)

mongoose.connection.on('error', function(error) {
    console.error('Database connection error:', error);
  });
  
  mongoose.connection.once('open', function() {
    console.log('Database connected');
  });

const app = express()

const Measure = require('./models/Medicion')

const createServer = () => {
    app.use(cors({origin: true}))

    app.get('/mediciones', async (req,res) => {
        const result = await Measure.find({}).exec()

        res.send(result)
    })

    app.post('/send', async (req, res) => {
        const { body } = req
        const measure = new Measure(body)
        await measure.save()

        res.sendStatus(200)
    })

    app.get('/status', async (req,res) => {
        const p = new Measure({
            sensor: 1,
            valor: 200
        })
        
        await p.save()
        res.send("Status")
    })

    return app
}

exports.api = functions.https.onRequest(createServer());