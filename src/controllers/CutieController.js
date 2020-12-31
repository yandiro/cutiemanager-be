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
                message = err;
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

async function getOneFully(req, res) {
    //TODO Verify access (only from user who created)
    const { cutieId: cutieId } = req.params;

    const cutie = await Cutie.findById(cutieId);

    return res.json(cutie);
}

async function getListOfCutiesWithNamePicAndPositionOrderedByPositionDESC(req, res) {
    const { user: userId } = req.headers;

    const user = await User.findById(userId);

    const cutieIdList = user.cuties;

    const cutieListWithNamePicAndPosition = await Cutie.find({
        '_id': { $in: cutieIdList }
    }, 'name position picture').sort({ position: -1 });

    res.json({ cutieListWithNamePicAndPosition })
}

async function update(req, res) {
    // TODO Verify access (only from user who created)
    // const { user: userId } = req.headers;
    console.log('BODY', req.body);

    const { updatedCutie } = req.body;

    const cutie = await Cutie.findById(updatedCutie._id);

    Object.keys(updatedCutie).forEach((key) => {
        cutie[key] = updatedCutie[key];
    });

    await cutie.save()
        .then(() => res.statusCode = 204)
        .catch((err) => {
            res.statusCode = 500;
            res.error = err;
        });

    return res.json();
}

module.exports = { store, getOneFully, getListOfCutiesWithNamePicAndPositionOrderedByPositionDESC, update }
