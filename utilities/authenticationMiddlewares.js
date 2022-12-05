const bcrypt = require('bcrypt');
require('dotenv').config();

const authUilities = {
    hashPassword: (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    checkPassword: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    },
    authenicateUser: (username, password) => {
        return new Promise((resolve, reject) => {
            db.getUser(username)
                .then((user) => {
                    if (user.length === 0) {
                        return reject('User not found');
                    }
                    if (authUilities.checkPassword(password, user[0].password)) {
                        return resolve(user[0]);
                    } else {
                        return reject('Incorrect password');
                    }
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    },
    generateToken: (user) => {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    },
    verifyToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return reject(err);
                return resolve(decoded);
            });
        });
    }
};

module.exports = authUilities;