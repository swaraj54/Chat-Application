const User =  require('../models/userModel');
const router = require('express').Router();
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register', async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await User.findOne({email}).exec();
        if(user){
            return res.send({
                success: false,
                message: 'User already Excits !'    
            })
        }
        const hashedPassword = await brcypt.hash(password,10);
        const newPassword = hashedPassword;
        const newUser = new User({name,email,password:newPassword});
        await newUser.save();
        return res.status(200).send({
            success: true,
            message: 'User Created !'    
        })
    } catch(error){
        return res.status(400).send({
            message:error.message,
            success: false
        })
    }
});

router.post('/login', async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email}).exec();
        if(!user){
            return res.send({
                success: false,
                message: 'User not Exicts !'    
            })
        }
        const isValidPassword = await brcypt.compare(password, user.password);
        if(!isValidPassword){
            return res.send({
                success: false,
                message: 'Invalid Password !'    
            })
        }

        const token = jwt.sign({userId : user._id},process.env.JWT_SECRET,{
            expiresIn:"1d",
        });
        res.send({
            success:true,
            message : 'User logged in Successfully',
            data :token
        })

    } catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        })

    }
});

router.get('/get-current-user', authMiddleware, async(req,res)=>{
    try{
        const user = await User.findOne({_id: req.body.userId});
        res.send({
            success:true,
            message:"User Fetced Successfully !",
            data: user,    
        })

    } catch(error){
        res.send({
            message : error.message,
            success: false
        })
    }
})

module.exports = router;