/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
// Connect to MongoDB database
mongoose.connect(process.env.DB, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

// Create schema model
const Book = new mongoose.model('book', {
  title: { type: String, required: true },
  comment_count: { type: Number, required: true },
  comments: [String],
})

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "comment_count": num_of_comments },...]
      Book.find((err, data) => {
        if (err) return res.json(err);
        const returnArray = data.map(x => {
          return {
            title: x.title,
            _id: x._id,
            comment_count: x.comment_count,
          }
        })
        res.json(returnArray);
      })
    })
    
    .post(function (req, res){
      const title = req.body.title;
      // Return error if no title given
      if (!title) {
        return res.json('No title given');
      }
      //response will contain new book object including at least _id and title
      const newBook = new Book({
        title,
        comment_count: 0,
        comments: [],
      })
      newBook.save((err, data) => {
        if (err) return res.json(err);
        res.json({
          _id: data._id,
          title: data.title,
        });
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany({}, (err, data) => {
        if (err) return res.json(err);
        res.json('complete delete successful');
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      const book_id = req.params.id;
      //json res format: {"_id": book_id, "title": book_title, "comments": [comment,comment,...]}
      Book.findById(book_id, (err, data) => {
        if (err) return res.json('No book exists');
        res.json({
          title: data.title,
          _id: data._id,
          comments: data.comments,
        });
      })
    })
    
    .post(function(req, res){
      var book_id = req.params.id;
      var comment = req.body.comment;
      if (!comment) return res.json('No comment given');
      else if (!book_id) return res.json('No _id given');
      //json res format same as .get
      Book.findByIdAndUpdate(
        book_id,
        { $push: { comments: comment }, $inc: { comment_count: 1 } },
        (err, data) => {
          if (err) return res.json('No book exists');
          res.json({
            _id: data._id,
            title: data.title,
            comments: [...data.comments, comment],
          })
        })
    })
    
    .delete(function(req, res){
      const book_id = req.params.id;
      if (!book_id) return res.json('No _id given');
      //if successful response will be 'delete successful'
      Book.findByIdAndRemove(book_id, (err, data) => {
        if (err) return res.json('No book exists');
        res.json('delete successful');
      })
    });
  
};
