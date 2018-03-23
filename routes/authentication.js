const User = require('../model/user'); // Importing User Schema
const jsonWt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        // Check if email is inserted
        if (!req.body.email) {
            res.json({ success: false, message: 'Please enter your email' })
        } else if (!req.body.username) {
            res.json({ success: false, message: 'Please enter a username' })
        } else if (!req.body.password) {
            res.json({ success: false, message: 'Please enter a password' })
        } else {

            let user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                password: req.body.password
            });
            user.save((err) => {
                if (err) {
                    if (err.code === 11000) {
                        res.json({ success: false, message: 'Username or email already exists', error: err });
                    } else if (err.errors) {
                        if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message });
                        } else if (err.errors.username) {
                            res.json({ success: false, message: err.errors.username.message });
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message });
                        } else {
                            res.json({ success: false, message: err }); // Returns any error that has not been covered
                        }
                    }
                    else {
                        res.json({ success: false, message: 'Cant save user', error: err });
                    }
                }
                else {
                    res.json({ success: true, message: 'Registration successful' });
                }
            });
        }

    });

    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'You must enter email' })
        } else {
            User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else if (user) {
                    res.json({ success: false, message: 'E-mail is already registered' })
                } else {
                    res.json({ success: true, message: 'E-mail is available' })
                }
            });
        }
    });

    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'You must enter username' })
        } else {
            User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else if (user) {
                    res.json({ success: false, message: 'Username is already registered' })
                } else {
                    res.json({ success: true, message: 'Username is available' })
                }
            });
        }
    });

    router.post('/login', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'Enter a username' });
        } else if (!req.body.password) {
            res.json({ success: false, message: 'Enter a password' });
        } else {
            User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else if (!user) {
                    res.json({ success: false, message: 'Username not found' });
                } else {
                    const validPass = user.comparePassword(req.body.password);
                    if (!validPass) {
                        res.json({ success: false, message: 'Wrong password' });
                    } else {
                        const token = jsonWt.sign({ userID: user._id }, config.secret, { expiresIn: '12h' });
                        res.json({ success: true, message: 'Success', token: token, user: { username: user.username } });
                    }
                }
            });
        }
    });

    router.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            res.json({ success: false, message: 'No token provided' });
        } else {
            jsonWt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Token has expired: ' + err });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });

    router.get('/profile', (req, res) => {
        User.findOne({ _id: req.decoded.userID}).select('username email').exec((err, user) =>{
            if (err) {
                res.json({ success: false, message: err });
            } else if (!user) {
                res.json({ success: false, message: 'User has not been found' });
            } else{
                res.json({ success: true, user: user });
            }
        });
    });

    router.get('/userId/:id', (req, res) => {
        User.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid user id' });
            } else if (!user) {
                res.json({ success: false, message: 'No user fond with a given id' });
            } else {
                res.json({ success: true, user: user });
            }
        });
    });

    router.put('/updateProfile', (req, res) => {
        if (!req.body._id) {
            res.json({ success: false, message: 'No user id has been provided' });
        } else {
            User.findOne({ _id: req.body._id }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: 'You must provide a valid id' });
                } else if (!user) {
                    res.json({ success: false, message: 'Cant find user id' });
                } else {
                    user.email = req.body.email;
                    user.username = req.body.username;
                    user.password = req.body.password;
                    user.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Profile has been edited!' });
                        }
                    });

                }
            });
        }
    });

    router.get('/publicProfile/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'No username was provided' })
        } else {
            User.findOne({ username: req.params.username }).select('username email').exec( (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else if (!user) {
                    res.json({ success: false, message: 'No username with a given id' })
                } else {
                    res.json({ success: true, user: user });
                }
            });
        }
    });

    return router;
}