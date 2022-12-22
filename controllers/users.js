const User = require('../models/user');


module.exports.renderRegister = (req, res) => {
    if (req.isAuthenticated()) {
        req.flash('error', 'You must be logged Out first!');
        return res.redirect('/cities');
    }
    res.render('users/register');
}

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Smart City Portal!');
            res.redirect('/cities');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    if (req.isAuthenticated()) {
        req.flash('error', 'You must be logged Out first!');
        return res.redirect('/cities');
    }
    if (req.query.returnTo) {
        req.session.returnTo = req.query.returnTo;
    }
    res.render('users/login');
}

module.exports.login = (req, res) => {
    const redirectUrl = res.locals.returnTo || '/cities';
    req.flash('success', 'Welcome back!');
    res.redirect(redirectUrl);
}

module.exports.logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/cities');
    });
}