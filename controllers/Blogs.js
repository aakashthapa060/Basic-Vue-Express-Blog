const Blogs = require("../models/Blogs");

const get_blogs = async (req,res) => {
	try {
		const blogs = await Blogs.find({});
		res.status(200).json({blogs})
	} catch(e) {
		// statements
		console.log(e);
	}
}
const create_blog = async (req,res) => {
	const {user,title,content} = req.body
	try {
		const blog = await Blogs.create({user,title,content});
		console.log(blog)
		res.status(201).json(blog);
	} catch(e) {
		// statements
		console.log(e);
	}
}

module.exports = {
	get_blogs,
	create_blog
}