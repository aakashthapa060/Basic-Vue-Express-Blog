const jwt = require("jsonwebtoken");

const createToken = (id,expDate) => {
	const secret_key = process.env.JWT_SECRET_KEY;
	const token = jwt.sign({data: id}, secret_key, {expiresIn:expDate});
	return token;
}

module.exports = createToken