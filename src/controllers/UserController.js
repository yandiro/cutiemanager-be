const User = require('../models/User');

module.exports = {
    async store(req, res) {

        let message;

        const { name, email } = req.headers;

        await User.create(
            {
                name,
                email
            },
            (err, instance) => {
                if (err) {
                    message = 'Error on creating registry';
                    res.statusCode = 500;
                } else {
                    message = 'Created';
                    res.statusCode = 201;
                }

                return res.json({ message: message, idCreated: instance._id });
            }
        )

    }
}