const Book = require('../models/Book.model')

const store = async(req, res) => {
    try{
        const book = new Book(req.body)
        await book.save()
        res.send(book)

    }catch(e){
        res.send(e)
    }
}

const index = async(req, res) => {
    try{
        const books = await Book.find()
        res.send(books)

    }catch(e){
        res.send(e)
    }
}

const show = async(req, res) => {
    try{
        const book = await Book.findById(req.params.id)
        if(!book) res.send('Book not found')
        res.send(book)

    }catch(e){
        res.send(e)
    }
}

const update = async(req, res) => {
    avalUpdatates = ["name", "category"]
    requested = Object.keys(req.body)
    isValid = requested.every( r => avalUpdatates.includes(r) )
    if(!isValid) res.send('updates unavaliable')

    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        if(!book) res.send('Book not found')
        res.send("Updated")

    }catch(e){
        res.send(e)
    }
}

const destroy = async(req, res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id)
        if(!book) res.send('Book not found')
        res.send("Deleted")

    }catch(e){
        res.send(e)
    }
}

module.exports = {store, index, show, update, destroy}