const config = require('config');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticater = require('./authenticater');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require ('express');
const app = express();
const debug = require('debug')('app:startup');

app.set('view engine','pug');
app.set('views', './views')//defaut



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);


//COnfiguration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
//sconsole.log('Mail Password: ' + config.get('mail.password'));



if(app.get('env')== 'development')
{
    app.use(morgan('tiny'));
    debug('Morgan enabled..');
}

app.use(authenticater);





//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));