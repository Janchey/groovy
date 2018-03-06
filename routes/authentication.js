const User = require('../model/user'); // Importing User Schema

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
                        } else{
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

    router.get('/checkEmail/:email', (req,res) => {
        if(!req.params.email) {
            res.json({ success: false, message: 'You must enter email'})
        } else {
            User.findOne({email: req.params.email}, (err, user) => {
                if(err){
                    res.json({success: false, message: err });
                } else if(user){
                    res.json({success: false, message: 'E-mail is already registered'})
                } else {
                    res.json({success: true, message: 'E-mail is available'})
                }
            });
        }
    });

    router.get('/checkUsername/:username', (req,res) => {
        if(!req.params.username) {
            res.json({ success: false, message: 'You must enter username'})
        } else {
            User.findOne({username: req.params.username}, (err, user) => {
                if(err){
                    res.json({success: false, message: err });
                } else if(user){
                    res.json({success: false, message: 'Username is already registered'})
                } else {
                    res.json({success: true, message: 'Username is available'})
                }
            });
        }
    });

return router;
}