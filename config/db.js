const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test123@ds255754.mlab.com:55754/polling-khk', {useNewUrlParser: true}).then(() => {
    console.log('db connected');
}).catch(err => console.log(err));