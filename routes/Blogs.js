const {Router} = require("express");
const router = Router();
const {
	get_blogs,
	create_blog
} = require("../controllers/Blogs");

router
.route("/")
.get(get_blogs)


router
.route("/create-blog")
.post(create_blog)



module.exports = router