const {Schema, model} = require("mongoose");

const BlogSchemaStructure = {
	user: {
		type: String,
	},
	title: {
		type: String,
		required: [true, "Title is Required"],
		maxlength:[30, "Character cannot excced 30"]
	},
	content: {
		type:String,
		required: [true, "Title is Required"],
		minlength:[10, "Character must be more than 10"]
	}
}
const BlogSchema = new Schema(BlogSchemaStructure);

const BlogModel = model("Blogs", BlogSchema);

module.exports = BlogModel;