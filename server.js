const session = require("express-session");
const express = require("express");
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/config');


const sesssssion = {
    secret: 'Keep my data safe duh',
    cookie: {
        maxAge: 420000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sesssssion));



app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/'));
const hbs = exphbs.create({
    helpers
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    sequelize.sync({ force: false });
  });
  