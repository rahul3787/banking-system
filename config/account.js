const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccountScema = new Schema({
    id : String,
    email : String,
    title: String,
    amount : Number,
    note :String,
    totalbal : Number,
     date : String,
     status : String,
    
 
});
const Account = mongoose.model('Account', AccountScema);
module.exports = Account;