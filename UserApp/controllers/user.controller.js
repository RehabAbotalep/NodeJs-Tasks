index = (req, res) => res.render('index', {
    title:'Home'
})

show = (req, res) => res.render('show', {
    title:'Show'
})

add = (req, res) => res.render('add', {
    title:'Add'
})

edit = (req, res) => res.render('edit', {
    title:'Edit'
})

//destroy = (req, res) => res.render('delete')


module.exports = {
    index, show, add, edit
}