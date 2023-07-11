const mongoose = require('mongoose')

const mongoUri = "mongodb+srv://erakash:akashD7892@cluster0.wgdzjmo.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000
});


