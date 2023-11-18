const Academy = require("../models/Academy");
const User = require("../models/User");
const asycnWrapper = require("../middleware/async");
const { StatusCodes } = require("http-status-codes");
const { haveCommonElements } = require("../utils/helperFunctions");

const addAcademy = asycnWrapper(async (req, res) => {
    req.body.createdBy = req.user.userId
    req.body.sports = req.body.sports.map(element => element.toLowerCase().trim());
    req.body.city = req.body.city.toLowerCase().trim();
    req.body.state = req.body.state.toLowerCase().trim();
    const academy = await Academy.create(req.body)
    res.status(200).json({ data: academy, success: true, })
})

const updateAcademy = asycnWrapper(async (req, res) => {
    const { id } = req.params
    const { userId } = req.user
    delete req.body.createdBy
    req.body.sports = req.body.sports.map(element => element.toLowerCase().trim());
    const academy = await Academy.findByIdAndUpdate({ _id: id, createdBy: userId }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ data: academy, success: true })
});

const getAcademy = asycnWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.userId)
    const queryObject = {};
    queryObject.state = user.state;
    queryObject.city = user.city;
    const academies = await Academy.find(queryObject);
    req.body.sport = [req.body.sport]
    req.body.sport = req.body.sport.map(element => element.toLowerCase().trim());
    let results = [];
    for (let i = 0; i < academies.length; i++) {
        if (haveCommonElements(academies[i].sports, req.body.sport)) {
            academies[i].sports = [req.body.sport]
            results.push(academies[i]);
        }
    }
    res.status(StatusCodes.OK).json({ data: results, success: true, });
});

module.exports = {
    addAcademy,
    updateAcademy,
    getAcademy,
};