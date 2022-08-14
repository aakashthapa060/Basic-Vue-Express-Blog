const {Schema,model} = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

const UserSchemaStructure = {
	username: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, "Username is required"],
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, "Email is Required"],
		validate: [isEmail, "Please enter valid Email"]
	},

	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [8, "Password must be 8 characters long"]
	}
}
const UserSchema = new Schema(UserSchemaStructure);

UserSchema.pre("save", async function(next) {
	try {
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(this.password, salt);
		this.password = hash;
		next();
	} catch(e) {
		console.log(e);
	}
})
const UserModel = model("Users", UserSchema);

module.exports = UserModel;