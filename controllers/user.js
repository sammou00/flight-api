import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import validatePassword from '../utils/validatePassword.js';
import validateEmail from '../utils/validateEmail.js';
import matchPassword from '../utils/matchPassword.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    register: (req, res) => {
        const { email, password, rePassword } = req.body;
        // check if email exists
        const emailExists = User.getByEmail(email);
        if (emailExists) {
            return res.status(400).render('404', {
                title: 'Email already exists',
                message: 'Email already exists'
            });
        }

        // validate email, password and check if passwords match
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const doPasswordsMatch = matchPassword(password, rePassword);

        if (isValidEmail && isValidPassword && doPasswordsMatch) {
            // hash password
            const hashedPassword = hashPassword(password);
            // create user
            User.add({ email, password: hashedPassword });

            console.log(email, hashedPassword);

            // redirect to login
            return res.status(302).redirect('/api/login');
        } else {
            return res.status(400).render('404', {
                title: 'Invalid email or password',
                message: 'Invalid email or password'
            });
        }
    },
    login: (req, res) => {
        const { email, password } = req.body;
        // check if email exists
        const emailExist = User.getByEmail(email);
        if (!emailExist) {
            return res.status(400).render('404', {
                title: 'Email does not exist',
                message: 'Email does not exist, please register'
            });
        }

        // check if password matches
        bcrypt.compare(password, emailExist.password, (err, valid) => {
            if (err) {
                console.error(err);
            }

            if (!valid) {
                return res.status(400).render('404', {
                    title: 'Invalid password or email',
                    message: 'Invalid password or email'
                });
            }

            // create token
            const token = jwt.sign({ email }, process.env.TOKEN_SECRET);

            // set cookie
            res.cookie('token', token, { httpOnly: true });

            res.status(302).redirect('/api/flights');
        });
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(302).redirect('/api/login');
    },
    getRegisterForm: (req, res) => {
        res.status(200).render('register-form');
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    }
};

export default userControllers;
