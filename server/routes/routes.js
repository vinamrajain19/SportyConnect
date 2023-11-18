const express = require('express')
const authenticateUser = require('../middleware/authentication');
const router = express.Router();
const {
    updatePlayer,
    getPlayers,
    getplayerdata
} = require('../controllers/players')

const {
    addAcademy,
    updateAcademy,
    getAcademy,
} = require("../controllers/academy");

router.route('/play/getplayerdata').get(authenticateUser, getplayerdata)
router.route('/academy/add-academy').post(authenticateUser, addAcademy)
router.route('/play/editprofile').patch(authenticateUser, updatePlayer)
router.route('/academy/get-academy').post(authenticateUser, getAcademy)
router.route('/play/getplayers').get(authenticateUser, getPlayers)

module.exports = router

