var express = require("express");
team = require("../models/team")
bodyParser = require("body-parser")
router = express.Router();
methodOverride = require("method-override")
user = require("../models/user")
team = require('../models/team')
upload = require("../multer")
router.use(methodOverride("_method"))
var {
    sendTeamUser,
    getTeamuser
} = require('../utils/teamChat')


router.get('/team', function(req, res) {
    sendTeamUser(req.user);
    user.findById(req.user).populate("team").exec(function(err, user) {
        res.render('team', { user: user });
    })
})

router.get('/team/new', function(req, res) {
    res.render('createTeam');
})

router.post('/team/new/:id', function(req, res) {
    user.findById(req.params.id, function(err, found) {
        if (err) {
            console.log(err)
            res.redirect('back');
        } else {
            team.create({
                name: req.body.name,
                description: req.body.desc,
                members: [{
                    member: req.user._id
                }]
            }, function(err, team) {
                if (err) {
                    console.log(err);
                    res.redirect('back')
                } else {
                    console.log('good till here')
                    found.team.push(team._id)
                    found.save();
                    res.redirect('/team');
                }
            })
        }
    })
})

router.post('/team/join', function(req, res) {
    team.findById(req.body.inviteId, function(err, foundTeam) {
        if (err) {
            console.log(err);
            res.redirect('back')
        } else {
            user.findById(req.user._id, function(err, user) {
                if (err) {
                    console.log(err);
                    res.redirect('back');
                } else {
                    user.team.push(foundTeam._id)
                    user.save();
                    foundTeam.members.push({ member: req.user._id });
                    foundTeam.save();
                    res.redirect('/team');
                }
            })

        }
    })
})

module.exports = router;