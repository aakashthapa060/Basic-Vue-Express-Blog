const authErrorHandler = (e) => {
	// console.log(e.message, e.code);
	const errors = {
		username: "",
		email: "",
		password: ""
	}

	if(e.code === 11000 ){
		if(e.message.includes("username_1 dup key")) errors.username = "Username Already Exists"; 
		else errors.email = "Email Already Exists";
	}

	// Validation Error
	  if(e.message.includes("Users validation failed")){
	    Object.values(e.errors).forEach(({properties}) => {
	      errors[properties.path] = properties.message;
	    })
	  }

	  return errors
}
const loginErrorHandler = (e) => {
	console.log(e.message);

	const errors = {
		email: "",
		password: ""
	}

	if(e.message === "Invalid Email") errors.email = "Email is Not Registered"
	if(e.message === "Invalid Password") errors.password = "Incorrect Password, Please Try Again!!!"

	return errors;
}
module.exports = {
	authErrorHandler,
	loginErrorHandler
}