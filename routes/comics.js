const User = require('../model/user'); // Importing User Schema
const Comic = require('../model/comic'); // Importing Comic Schema
const jsonWt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

    router.post('/newComic', (req, res) => {
        if (!req.body.title) {
            res.json({ success: false, message: 'Comic title is required.' });
        } else if (!req.body.creator) {
            res.json({ success: false, message: 'Creator is required.' });
        } else if (!req.body.writer) {
            res.json({ success: false, message: 'Writer is required.' });
        } else if (!req.body.artist) {
            res.json({ success: false, message: 'Artist is required.' });
        } else if (!req.body.publisher) {
            res.json({ success: false, message: 'Publisher is required.' });
        } else if (!req.body.status) {
            res.json({ success: false, message: 'Status is required.' });
        } else if (!req.body.number) {
            res.json({ success: false, message: 'Comic number is required.' });
        } else if (!req.body.originalNumber) {
            res.json({ success: false, message: 'Comic original number is required.' });
        } else if (!req.body.yearPublished) {
            res.json({ success: false, message: 'Year published is required.' });
        } else if (!req.body.ganre) {
            res.json({ success: false, message: 'Ganre is required.' });
        } else {
            const comic = new Comic({
                title: req.body.title,
                image: req.body.image,
                creator: req.body.creator,
                writer: req.body.writer,
                artist: req.body.artist,
                publisher: req.body.publisher,
                status: req.body.status,
                number: req.body.number,
                originalNumber: req.body.originalNumber,
                yearPublished: req.body.yearPublished,
                ganre: req.body.ganre

            });
            comic.save((err) => {
                if (err) {
                    if (err.errors) {
                        if (err.errors.title) {
                            res.json({ success: false, message: err.errors.title.message });
                        } else if (err.errors.creator) {
                            res.json({ success: false, message: err.errors.creator.message });
                        } else if (err.errors.writer) {
                            res.json({ success: false, message: err.errors.writer.message });
                        } else if (err.errors.artist) {
                            res.json({ success: false, message: err.errors.artist.message });
                        } else if (err.errors.publisher) {
                            res.json({ success: false, message: err.errors.publisher.message });
                        } else if (err.errors.status) {
                            res.json({ success: false, message: err.errors.status.message });
                        } else if (err.errors.number) {
                            res.json({ success: false, message: err.errors.number.message });
                        } else if (err.errors.originalNumber) {
                            res.json({ success: false, message: err.errors.originalNumber.message });
                        } else if (err.errors.yearPublished) {
                            res.json({ success: false, message: err.errors.yearPublished.message });
                        } else if (err.errors.ganre) {
                            res.json({ success: false, message: err.errors.ganre.message });
                        } else {
                            res.json({ success: false, message: err.errors.err });
                        }
                    } else {
                        res.json({ success: false, message: err });
                    }
                } else {
                    res.json({ success: true, message: 'Comic has been posted' }); // Return success message
                }
            });
        }
    });

    router.get('/allComics', (req, res) => {
        Comic.find({}, (err, comics) => {
            if (err) {
                res.json({ success: false, message: err });
            } else if (!comics) {
                res.json({ success: false, message: 'No comics where fond in our database' });
            } else {
                res.json({ success: true, comics: comics });
            }
        }).sort({ '_id': -1 });
    });

    router.get('/singleComic/:id', (req, res) => {
        Comic.findOne({ _id: req.params.id }, (err, comic) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid comic id' });
            } else if (!comic) {
                res.json({ success: false, message: 'No comic fond with a given id' });
            } else {
                res.json({ success: true, comic: comic });
            }
        });
    });

    router.put('/updateComic', (req, res) => {
        if (!req.body._id) {
            res.json({ success: false, message: 'No comic id has been provided' });
        } else{
            Comic.findOne({_id: req.body._id }, (err, comic) => {
                if (err){
                    res.json({ success: false, message: 'You must provide a valid id' });
                } else if (!comic){
                    res.json({ success: false, message: 'Cant find comic id' });
                } else {
                    comic.title = req.body.title;
                    comic.creator = req.body.creator;
                    comic.writer = req.body.writer;
                    comic.artist = req.body.artist;
                    comic.publisher = req.body.publisher;
                    comic.status = req.body.status;
                    comic.number = req.body.number;
                    comic.originalNumber = req.body.originalNumber;
                    comic.yearPublished = req.body.yearPublished;
                    comic.ganre = req.body.ganre;
                    comic.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Comic has been edited!' });
                        }
                    });

                }
            });
        }
    });

    router.delete('/deleteComic/:id', (req, res ) => {
        if(!req.params.id){
            res.json({ success: false, message: 'No id was provided' });
        }else {
            Comic.findOne({_id: req.params.id}, (err, comic) => {
                if (err){
                    res.json({ success: false, message: 'Cant delete comic. Invalid id' });
                } else if(!comic){
                    res.json({ success: false, message: 'Comic was not found' });
                } else{
                    comic.remove((err) => {
                        if (err){
                            res.json({ success: false, message: err });
                        } else{
                            res.json({ success: true, message: 'Comic has been deleted!' });
                        }
                    });
                }
            });
        }
    });

    return router;
}