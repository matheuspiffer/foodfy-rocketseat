
const Chef = require('../models/chef')
const { age, date, since } = require('../../lib/utils')

exports.index = (req, res) => {
    Chef.all(chefs => {
        return res.render('admin/chefs/index', { chefs })
    })
}

exports.create = (req, res) => {
    return res.render('admin/chefs/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)
    keys.forEach(key => {
        if (!req.body[key]) {
            return res.send('please fill the ' + ' field')
        }
    })
    Chef.create(req.body, () => {
        return res.redirect('admin/chefs')
    })

}

exports.show = (req, res) => {
    const { id } = req.params
    Chef.find(id, chef => {
        return res.render('admin/chefs/show', { chef })
    })

}

exports.edit = (req, res) => {
    // const { id } = req.params
    // Chef.find(id, chef => {
    //     console.log(chef)
    //     chef.ingredients = chef.ingredients.split(' ')
    //     chef.preparation = chef.preparation.split(' ')
    //     Chef.chefSelectOption(chefs => {
    //         return res.render('admin/chefs/edit', { item: chef, chefs })
    //     })
    // })
    return
}

exports.put = (req, res) => {

    // Chef.update(req.body, (id) => {
    //     console.log(id)
    //     return res.redirect('chefs/' + id)
    // })

    return
}

exports.delete = (req, res) => {
    // const { id } = req.body
    // Chef.delete(id, () => {
    //     return res.redirect('chefs')
    // })

    return
}