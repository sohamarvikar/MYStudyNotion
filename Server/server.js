const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();

const {connect} = require('./config/database');
const {cloudinaryConnect} = require('./config/cloudinary');

require('dotenv').config();
const fileUpload = require("express-fileupload");

const userRoutes = require('./routes/userRoutes')
const profileRoutes = require('./routes/profileRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const courseRoutes = require('./routes/courseRoutes')
const reachRoutes = require('./routes/Contact')
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

connect();
cloudinaryConnect();

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", reachRoutes);
//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
