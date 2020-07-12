const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//Fetch todos

router.post('/',async(req,res)=>{
    const { id } = req.body;
    try{      
        const tasks = await Task.find({aId: id},);
        res.json(tasks)
    }catch(err){
        res.json({ message: err})
    }
});

router.post('/new', async (req,res)=>{
    const { aId, title, description, status } = req.body;
    const task = new Task({
        aId: aId,
        title: title,
        description: description,
        status: status
    });
    try{
        const savedTask = await task.save()
        res.json(savedTask)
    }catch(err){
        res.json({message: err})
    }
});

router.post('/updateStatus', async (req,res)=>{
    const { id, status, aId } = req.body;
    Task.findByIdAndUpdate(
        { _id: id },
        { status: status },
        async function(err, result) {
          if (err) {
            res.send(err);
          } else {
            try{      
                const tasks = await Task.find({aId: aId},);
                res.json(tasks)
            }catch(err){
                res.json({ message: err})
            }
          }
        }
      );  
       
});

//////////////////////WHAT THE ACTUAL...
router.delete('/:todoId', async (req,res)=>{
    try{
        const removedTask = await Task.deleteOne({_id: req.params.todoId})
        res.json(removedTask);
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router;