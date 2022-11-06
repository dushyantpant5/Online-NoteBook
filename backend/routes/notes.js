const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); 
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')

// Route 1 //Getting all notes of user using :GET "/api/notes/fetchnotes" ,login is required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2 //Adding notes of user using :POST "/api/notes/addnote" ,login is required.
router.post('/addnote', fetchuser,[
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description','Enter a valid Description').isLength({ min: 5 })
], async (req, res) => {
   
   try {
    const{title,description,tag} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    else
    {
        const note = new Notes({
            title,description,tag,user: req.user.id 
        })
        const savedNote = await note.save();

        res.json(savedNote);
    }

   } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
   }

})

// Route 3 //Update an existing note using :PUT "/api/notes/updatenote" ,login is required.

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        
    const {title,description,tag} = req.body;
    //Create a new note object

    const newNote = {};

    if(title)
    {
        newNote.title = title;
    }
    if(description)
    {
        newNote.description = description;
    }
    if(tag)
    {
        newNote.tag = tag;
    }

    //Find the note that needs to be updated

    let note = await Notes.findById(req.params.id);

    if(!note)
    {
        return res.status(400).send("Not Found");
    }

    if(note.user.toString()!=req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id , {$set: newNote},{new:true})

    res.json({note});
    } catch (error) {
        
        console.error(error.message)
        req.status(500).send("Internal Server Error")

    }


})

// Route 4 //Delete an existing note using :DELETE "/api/notes/deletenote" ,login is required.

router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    try {
        //Find the note that needs to be deleted

    let note = await Notes.findById(req.params.id);

    if(!note)
    {
        return res.status(400).send("Not Found");
    }

    if(note.user.toString()!=req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id )
    res.json({"Success" : "Note has been Deleted" , note:note});

    } catch (error) {
        
        console.error(error.message)
        req.status(500).send("Internal Server Error")

    }
 


})











module.exports = router