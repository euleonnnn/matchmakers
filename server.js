const express = require("express");
const { reset } = require("nodemon");
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const path = require('path');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected...')
    } catch(err) {
        console.error(err.messgae);
        process.exit(1);
    }
}

const app = express();

connectDB();

app.use(express.json({extended: false}));

//Routers
app.use('/api/users', require("./routes/api/users"));
app.use('/api/auth', require("./routes/api/auth"));
app.use('/api/profile', require("./routes/api/profile"));
app.use('/api/games', require("./routes/api/games"));

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));