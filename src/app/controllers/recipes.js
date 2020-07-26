
const Recipe = require('../models/recipe')
const { age, date, since } = require('../../lib/utils')

exports.index = (req, res) => {
    Recipe.all(recipes => {
        return res.render('admin/recipes/index', { items: recipes })
    })
}

exports.create = (req, res) => {
    Recipe.chefSelectOption(chefs => {
        return res.render('admin/recipes/create', { chefs })
    })
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)
    keys.forEach(key => {
        if (!req.body[key]) {
            return res.send('please fill the ' + ' field')
        }
    })
    console.log(req.body.ingredients)
    Recipe.create(req.body, recipe => {

        return res.redirect('recipes/' + recipe.id)

    })

}

exports.show = (req, res) => {
    const { id } = req.params
    Recipe.find(id, recipe => {
        return res.render('admin/recipes/show', { item: recipe })
    })

}

exports.edit = (req, res) => {
    const { id } = req.params
    Recipe.find(id, recipe => {
        Recipe.chefSelectOption(chefs => {
            return res.render('admin/recipes/edit', { item: recipe, chefs })
        })
    })
}

exports.put = (req, res) => {
    Recipe.update(req.body, (id) => {   

        return res.redirect('recipes/' + id)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body
    Recipe.delete(id, () => {
        return res.redirect('recipes')
    })
}