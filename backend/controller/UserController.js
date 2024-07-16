import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";


export const register = async (req , res , next) => {
    try {
        const { name , email , password} = req.body;
        if(!name || !email || !password) return res.status(401).json({success : false, message : "please provide all required fields!!"});

        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(409).json({ success : false , message : "Email already exists!!"});
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ name, email, password : hashedPassword });
        await newUser.save();

        res.json({ success : true, message : "User registered successfully!!", user : newUser });
        
    } catch (error) {
        next(error);
    }
}

export const login = async (req , res , next) => {
    try {
        
        const { email, password } = req.body;
        if(!email ||!password) return res.status(401).json({ success : false, message : "please provide all required fields!!"});

        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ success : false, message : "User not found!!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({ success : false, message : "Incorrect password!!"});

        if(user) {
            const {password , ...userRes} = user._doc;
            res.json({ success : true, message : "User logged in successfully!!", user : userRes });
        }

    } catch (error) {
        next(error);
    }
}
