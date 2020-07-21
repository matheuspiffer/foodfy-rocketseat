const fs = require('fs')
const Recipe = require('../models/recipe')
// const { age, date, since } = require('../utils')
// const { parse } = require('path')

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
    // const { id } = req.params
    // const foundRecipe = data.recipes.find(recipe => {
    //     return recipe.id == id
    // })
    // if (!foundRecipe) return res.send('Recipe not found.')

    // console.log(foundRecipe)

    // res.render('admin/edit', {  })
    return
}

exports.put = (req, res) => {
    // const { id } = req.body
    // let index = 0
    // console.log(id)
    // const foundRecipe = data.recipes.find((recipe, foundIndex) => {
    //     if (recipe.id == id) {
    //         index = foundIndex
    //         return true
    //     }
    // })
    // if (!foundRecipe) return res.send('Recipe not found')
    // const updatedRecipe = {
    //     ...foundRecipe,
    //     ...req.body,
    //     id: Number(req.body.id)
    // }
    // data.recipes[index] = updatedRecipe
    // fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    //     if (err) return res.send("Write File error")
    //     return res.redirect('recipes/' + id)
    // })
    return
}

exports.delete = (req, res) => {
    // const { id } = req.body
    // const filteredRecipes = data.recipes.find(recipe => recipe.id != id)
    // data.recipes = filteredRecipes
    // fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    //     if (err) return res.send("Write file error")
    //     return res.redirect('recipes')
    // })

    return
}