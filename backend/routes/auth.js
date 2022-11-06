const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const { body, validationResult } = require('express-validator'); 
const jwt = require('jsonwebtoken');
const { baseModelName } = require('../models/User');
const JWT_SEC = "dushyantpantwantsyou";
const fetchuser = require('../middleware/fetchuser')


// Route 1 //Create a user using :POST "/api/auth/createuser" ,Here no login is required.
router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
], async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    
    //Check

    try {
      let user = await User.findOne({email:req.body.email});
      if(user)
      {
        return res.status(400).json({success,error:"This email has already been registered"});
      }
      else
      {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);

        user = await User.create({
          name: req.body.name,
          email:req.body.email,
          password: secPass
  
        })
      }
      const data ={
        user:{
          id:user.id
        }
      }

      const authData = jwt.sign(data,JWT_SEC);
      success = true;
      res.json({success,authData});
    
    } 
    catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error Occured");
    }


    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    // res.json({error:'This email has already been resgistered'})})
})


//Route 2 //Authenticate a user using :POST "/api/auth/login" ,login is required.

router.post('/login',[
  body('email',"Enter a valid email").isEmail(),
  body('password',"Password can't be black").exists(),

], async (req,res)=>{
  
  let success = false;

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    else
    {
      const {email,password} = req.body;

      try {
        let user = await User.findOne({email});
        if(!user)
        {
          return res.status(400).json({error : "Enter valid Username/Password"});
        }

        else
        {
          const passwordCompare = await bcrypt.compare(password,user.password);
          if(!passwordCompare)
          {
            // success = false;
            return res.status(400).json({success , error : "Enter valid Username/Password"})
          }
          else
          {
            const payload = {
              user:{
                id : user.id
              }
            }
            
            const authData = jwt.sign(payload,JWT_SEC);
            success = true;
            res.json({success,authData});
          }
        }
      } 
      catch (error) {
        console.log(error);
      res.status(500).send("Internal Server Error Occured");
      }

    }


  
})

// Route 3 //Geting Logged User Details using :POST "/api/auth/getuser" , Login required
router.post('/getuser',fetchuser, async (req,res)=>{

  try {

    userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);

  } catch (error) {
    console.log(error);
        res.status(500).send("Internal Server Error Occured");
  }
})
















module.exports = router




