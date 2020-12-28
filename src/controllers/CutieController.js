const Cutie = require('../models/Cutie');
const User = require('../models/User');

async function store(req, res) {

    const { name } = req.body;
    const { user: userId } = req.headers;

    let message;

    await Cutie.create({
        name,
        position: 0,
        'owned-by': userId
    },
        async (err, instance) => {
            if (err) {
                console.log(err);

                res.statusCode = 500;
                message = 'error on craeting registry';
            } else {
                res.statusCode = 201;
                message = 'created';
            }

            const user = await User.findById(userId);
            user.cuties.push(instance._id);
            await user.save();

            return res.json({ message: message, idCreated: instance._id });
        }
    )
}

module.exports = { store }
