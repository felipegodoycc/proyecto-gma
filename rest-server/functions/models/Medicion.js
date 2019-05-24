const mongoose = require('mongoose')

const Measures = mongoose.model('Measure', {
    sensor: Number,
    valor: Number,
    date: { type: Date, default: Date.now },
})

module.exports = Measures