const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

//Fetch sessions

router.get('/',async(req,res)=>{
    const { id } = req.body;
    try{      
        const sessions = await Session.find({aId: id},);
        res.json(sessions)
    }catch(err){
        res.json({ message: err})
    }
});

router.post('/new', async (req,res)=>{
    const { id, body } = req.body;
    const session = new Session({
        aId: id,
        body: body,
    });
    try{
        const savedSession = await session.save()
        res.json(savedSession)
    }catch(err){
        res.json({message: err})
    }
});

router.delete('/:sessionId', async (req,res)=>{
    try{
        const removedSession = await Session.deleteOne({_id: req.params.activityId})
        res.json(removedSession);
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router;