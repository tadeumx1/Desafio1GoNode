const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
var moment = require('moment');
moment().format();

const app = express();

nunjucks.configure('views', {

    autoescape: true,
    express: app,
  
  });

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

const checkMiddleware = ((req, res, next) => {

    //console.log("checkMiddlware");
    //console.log(req.query)

    if (req.query.nome == '') {

        //console.log('Não tem nome')
        res.redirect('/');

    }

    //next();

});

app.get('/', (req, res) => {

// res.send('Hello World ! ')
res.render('main');

});

app.post('/check', (req,res) => {
// console.log(req.body);

const DATA_NASCIMENTO = `${req.body.date}`;

if(DATA_NASCIMENTO == '') {

    // Como posso fazer essa validação ?

}

const idade = moment().diff(moment(DATA_NASCIMENTO, "YYYY/MM/DD"), 'years');

if(idade > 18) {

    res.redirect(`/major?nome=${req.body.username}`)

}

else {

    res.redirect(`/minor?nome=${req.body.username}`)

}


});

app.get('/major', checkMiddleware, (req, res) => {

    //res.send('Major')
    console.log("Major");
    console.log(req.query)

    res.render('major', {nome: req.query.nome});

});

app.get('/minor', checkMiddleware, (req, res) => {

    //res.send('Minor')
    console.log("Minor");
    console.log(req.query)

    res.render('minor', {nome: req.query.nome});

});

app.listen(3000);