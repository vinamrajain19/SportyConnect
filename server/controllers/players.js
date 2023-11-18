const Academy = require('../models/Academy')
const User = require('../models/User')
const asycnWrapper = require('../middleware/async');
const { StatusCodes } = require("http-status-codes");
const { haveCommonElements, areUsersAvailable } = require('../utils/helperFunctions')

const getplayerdata = asycnWrapper(async (req, res) => {
    const user = await User.findById(req.user.userId)
    res.status(200).json({ data: user, success: true })
})

const updatePlayer = asycnWrapper(async (req, res) => {
    const { userId } = req.user
    req.body.city = req.body.city.toLowerCase().trim();
    req.body.state = req.body.state.toLowerCase().trim();
    req.body.intrests = req.body.intrests.map(element => element.toLowerCase().trim());
    const player = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ data: player, success: true, })
})

const getPlayers = asycnWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.userId)
    const intrests1 = user.intrests;

    const queryObject = {}
    queryObject.state = user.state
    queryObject.city = user.city

    let players = await User.find(queryObject)
    let potentialPeers = [];
    for (let p of players) {
        if (p._id.equals(user._id)) {
            continue;
        }
        potentialPeers.push({
            name: p.name,
            city: p.city,
            state: p.state,
            gender: p.gender,
            intrests: p.intrests,
            availability: p.availability,
            contactNo: p.contactNo,
            skillLevels: p.skillLevels,
        });
    }
    let results = []
    for (let i = 0; i < potentialPeers.length; i++) {
        if (haveCommonElements(potentialPeers[i].intrests, intrests1)) {
            const Match = areUsersAvailable(user, potentialPeers[i]); // Match = { match: matchingTime.length > 0, matchingTime };
            if (Match.match) {
                results.push(potentialPeers[i]);
                results[results.length - 1].availability = Match.matchingTime;
            }
        }
    }
    res.status(StatusCodes.OK).json({ data: results, success: true });
});

module.exports = {
    updatePlayer, getPlayers, getplayerdata
}

