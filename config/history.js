const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HistoryScema = new Schema({
    title: String,
    body: String,
    
 
});
const History = mongoose.model('History', HistoryScema);
module.exports = History;