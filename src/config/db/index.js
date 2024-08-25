const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Yang_dev');
        console.log('mongodb oki')
    } catch (error) {
        console.log('mongodb error')
    }
}

module.exports = {connect};