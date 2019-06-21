const functions = require('firebase-functions');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const _ = require('underscore')

const mongooseConfig = { useNewUrlParser: true }

const mongouri = "mongodb+srv://test:test12345@cluster0-2vq26.gcp.mongodb.net/medicion?retryWrites=true"

mongoose.connect(mongouri,mongooseConfig)

mongoose.connection.on('error', (error) => {
    console.error('Database connection error:', error);
  });
  
  mongoose.connection.once('open', () => {
    console.log('Database connected');
  });

const app = express()

const Measure = require('./models/Medicion')

const createServer = () => {
    try{
        app.use(cors())
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())

        app.post('/mediciones', async (req,res) => {
            let body = req.body
            let dia = body.dia || 23;
            let mes = body.mes-1 || 5;
            let ano = body.ano || 2019;         

            let min_date = new Date(ano,mes,dia)
            min_date.setMinutes(10);
            let max_date = new Date()
            max_date.setDate(min_date.getDate());
            max_date.setHours(23);
            max_date.setMinutes(59);
            max_date.setSeconds(59);
            console.log("min_date:",min_date)
            console.log("max_date:",max_date)

            return new Promise( (resolve, reject) => {
                Measure.find({ "date": { $gte: min_date.toUTCString(), $lte: max_date.toUTCString() } }, (err, datos) => {
                    if(err){
                        reject(err)
                    }
                    resolve(datos)
                    })
            })
            .then( (datosDB) => {
                return res.status(200).json({
                    ok:true,
                    datosDB
                })
            })
            .catch( (error) => {
                return res.status(404).json({
                    ok:false,
                    message: error
                })
            })
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
    } catch(error) {
        console.log(error)
    }
}

exports.api = functions.https.onRequest(createServer());