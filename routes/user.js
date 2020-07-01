const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport')

router.get('/',async(req,res)=>{
    try{      
        const users = await User.find();
        res.json(users)
    }catch(err){
        res.json({ message: err})
    }
});
router.post('/addNumActivities', async (req,res)=>{
    const { id } = req.body;
    try{
        User.findByIdAndUpdate(
            { _id: id },
            { $inc: { numActivities: 1 } },
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.json(result)
              }
            }
          );
        }
        catch(err){
            res.json({message: err})
        }
});
router.post('/addNumTasks', async (req,res)=>{
    const { id } = req.body;
    console.log(id)
    try{
        User.findByIdAndUpdate(
            { _id: id },
            { $inc: { numTasks: 1 } },
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.json(result)
              }
            }
          );
        }
        catch(err){
            res.json({message: err})
        }
});
router.post('/addNumSessions', async (req,res)=>{
    const { id } = req.body;
    try{
        User.findByIdAndUpdate(
            { _id: id },
            { $inc: { numSessions: 1 } },
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.json(result)
              }
            }
          );
        }
        catch(err){
            res.json({message: err})
        }
});
router.post('/addNumHours', async (req,res)=>{
    const { id } = req.body;
    try{
        User.findByIdAndUpdate(
            { _id: id },
            { $inc: { numHours: 1 } },
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.json(result)
              }
            }
          );
        }
        catch(err){
            res.json({message: err})
        }
});
router.post('/signUp', async (req,res)=>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
    });
    try{
        const savedUser = await user.save()
        res.json(savedUser)
        req.session.currentUser = savedUser;
        console.log(savedUser)
    }catch(err){
        res.json({message: err})
    }
    /*User.register({ username: req.body.username }, req.body.password, function(err, user){
        if(err){
            console.log(err);
            console.log("something bad happend")
        }else{
            passport.authenticate("local")(req, res, function(){
                console.log("success!")
                res.json(user)
            });
        }
    });*/
});
router.get('/fetchUser', async (req, res)=>{
    console.log(req.session.currentUser);
    if (req.session.currentUser) {
        const user = await User.findOne({_id: req.session.currentUser._id})        
        req.session.currentUser = user;
        res.status(200).json(req.session.currentUser)
      } else {
        res.status(401).json({data: 'not-authorized'})
      }
});
router.post('/signIn', async (req, res)=>{
    const { username, password } = req.body;

    User.findOne({username: username, password: password}, async function(err, user) {
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.status(204).send();
        }
        try{
            const user = await User.find({ username: username });
            req.session.currentUser = user;
            return res.status(200).json(user);
        }catch(err){
            res.json({message:err})
        }
        
    }); 
    
});

module.exports = router;