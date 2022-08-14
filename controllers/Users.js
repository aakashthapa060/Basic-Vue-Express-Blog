const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createToken = require("../utils/createToken");
const  {
	authErrorHandler,
	loginErrorHandler
} = require("../utils/errorHandler");
const maxAge = 60 * 60 * 24;

const get_user = async (req,res) => {
	const cookie = req.cookies["userAuth"]
	if(cookie){
		const claims = jwt.verify(cookie, process.env.JWT_SECRET_KEY)
		if(!claims){
			return res.status(401).json({message: "Unauthenticated"})
		}
		const user = await User.findOne({_id: claims.data});
		const {password, ...data} = await user.toJSON()
		res.json(data)
	}


}

const create_user = async (req,res) => {
	const {username,email,password} = req.body;
	try {
		
		const user = await User.create({username,email,password});
		const token = createToken(user._id,maxAge);
		res.cookie("userAuth", token, {httpOnly: true, maxAge: maxAge * 1000});
		res.status(201).json({message: "Success"});
	} catch(e) {
		const errors = authErrorHandler(e);
		res.status(300).json({errors});
	}
}
const login_user = async (req,res) => {
	const {email,password} = req.body;
	try {
		const user = await User.findOne({email: email})
		if(!user){
			throw Error("Invalid Email")
			return;
		} 
		else{
			const match = await bcrypt.compare(password, user.password);
			if(!match) throw new Error("Invalid Password")
			else{
				const token = createToken(user._id, maxAge);
				res.cookie("userAuth", token, {httpOnly: true, maxAge: maxAge * 1000});
				res.status(201).json({message: "Success"});
			}
		}
	} catch(e) {
		// statements
		const errors = loginErrorHandler(e)
		res.json({errors})

	}
}
const logout_user = async (req,res) => {
	res.cookie("userAuth", "", {httpOnly: true, maxAge: 0})
	res.json({
		message:"success"
	})
}
module.exports = {
	get_user,
	create_user,
	login_user,
	logout_user
}