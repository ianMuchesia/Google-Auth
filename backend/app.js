require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require('cookie-session');
const authRoute = require("./routes/auth");
const app = express();
require("./passport");
const connectDB = require("./database/connectDB");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(session({
	cookie:{
		secure: true,
		maxAge:24 * 60 * 60 * 1000,
		   },
	
	secret: 'secret',
	saveUninitialized: true,
	resave: false
	}));
	


app.use(passport.initialize());
app.use(passport.session());


app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// app.use("/auth", authRoute);
// Google authentication route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback route
app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  // Get the user and token from the passport authentication callback
  const { user, token } = req.user;

  // Set the JWT as an HTTP-only cookie
  res.cookie('token', token, { httpOnly: true });

  // Redirect or send a response
 // Replace with your desired redirect URL or response
});


const port = process.env.PORT || 4000;
const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
