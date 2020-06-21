const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

//Fetch todos

router.post('/',async(req,res)=>{
    const { id } = req.body;
    try{      
        const goals = await Goal.find({aId: id},);
        res.json(goals)
    }catch(err){
        res.json({ message: err})
    }
});

router.post('/new', async (req,res)=>{
    const { aId, title, details, date, deadline } = req.body;
    const time = new Date().getTime;
    console.log(time);
    const goal = new Goal({
        aId: aId,
        title: title,
        details: details,
        date: date,
        deadline: deadline
    });
    try{
        const savedGoal = await goal.save()
        res.json(savedGoal)
    }catch(err){
        res.json({message: err})
    }
});

router.delete('/:goalId', async (req,res)=>{
    try{
        const removedGoal = await Goal.deleteOne({_id: req.params.goalId})
        res.json(removedGoal);
    }catch(err){
        res.json({message: err})
    }
});


module.exports = router;