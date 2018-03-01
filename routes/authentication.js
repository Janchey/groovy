const User = require('../model/user');

module.exports = (router) => {
    router.post('/register', (req, res) => {

        if (!req.body.email) {
            res.json({ success: false, message: 'Please enter your email' })
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'Please enter a username' })
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'Please enter a password' })
                } else {

                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            if (err.code = 11000) {
                                res.json({ success: false, message: 'Username or email already exists', error: err });
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message });
                                    }
                                }
                                else {
                                    res.json({ success: false, message: 'Cant save user', error: err });
                                }
                            }
                        } else {
                            res.json({ success: true, message: 'User saved' });
                        }
                    });
                }
            }
        }

    });
    return router;
}