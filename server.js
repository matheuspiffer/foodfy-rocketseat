const express = require('express')
const nunjucks = require('nunjucks')

const recipes = require('./data')

const server = express()

server.use(express.static('public'))
server.set('view engine', 'html')
nunjucks.configure('src/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', (req, res) => {
    res.render('index', { items: recipes })
})
server.get('/recipes', (req, res) => {
    res.render('recipes', { items: recipes })
})
server.get("/recipes/:index", function (req, res) {
    const ingredients = [...recipes];
    const recipeIndex = req.params.index;
    res.render('recipe', { item: ingredients[recipeIndex] })
})
server.get('/about', (req, res) => {
    res.render('about')
})




server.listen(5000, function () {
    console.log('server is running');
});