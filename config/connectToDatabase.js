const mongoose =require('mongoose');
const config =require('config');
const mongoURI = 'mongodb+srv://rahul123:12345@cluster0.1qy6g.mongodb.net/wiki?retryWrites=true&w=majority'

const connectToDatabase = async ()=>{
    try {
        await mongoose.connect(
            mongoURI,
            {
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology:true,
            useNewUrlParser:true
            }
        )
        console.log("mongoDb is connected");
    }catch(error){
       console.log(error);
       process.exit(1);
    }
}
module.exports = connectToDatabase;