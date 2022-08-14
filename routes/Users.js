const {Router} = require("express");
const router = Router();
const {
	get_user,
	create_user,
	login_user,
	logout_user
} = require("../controllers/Users");

router
.route("/")
.get(get_user)
.post(create_user)

router
.route("/login")
.post(login_user);

router
.route("/logout")
.post(logout_user)
module.exports = router