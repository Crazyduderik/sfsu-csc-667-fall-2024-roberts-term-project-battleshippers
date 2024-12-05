/*****************************************
* Description: Backend methods for the hashing of passwords
* and the verification of logins against hashed passwords
*****************************************/

const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const router = express.Router();

//TODO: Verify this line
const connection = require('./db');

// Login 
// POST request
router.post('/login', async (req, res) => {//TODO: API VERIFY LOGGED OUT (can't login if already logged in)
	const username = req.body.username;
	const password = req.body.password;
  
	try {
		const [results] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
		// If user does not exist,
    // Return Error
		if (results.length === 0)
      {return res.status(400).json({error: "Invalid Username or Password" });}
		const user = results[0];

		const isMatch = await bcrypt.compare(password, user.password_hash);
		if (!isMatch) {
			return res.status(400).json({ error: 'Invalid Username or Password' });
		}

		const [sessionResults] = await connection.execute('SELECT * FROM sessions WHERE user_id = ? AND session_end IS NULL', [user.uuid]);

		req.session.user = {//TODO: Verify we have this columns
			email: user.email,
			username: user.username,
			uuid: user.uuid,
			sessionStart: new Date(),
			userId: user.user_id,
		};

		await connection.execute("INSERT INTO sessions (session_id, user_id, session_start, expires, user_agent) VALUES (?, ?, ?, ?, ?)",
                             [req.session.id,
                              req.session.user.uuid,
                              req.session.user.sessionStart,
                              new Date(Date.now() + (24 * 60 * 60 * 1000))]
                            );
		return res.json({ message: "Login Successful!" });
	} catch (err)
    {return res.json({ error: err });}
});

// Registration 
// POST request
router.post('/register', async (req, res) => {//TODO: HAVE API VERIFICATION THAT USER IS NOT LOGGED IN
	const { username, email, password, verify_password } = req.body;

	// Passwords must match
	if (password !== verify_password)
    {return res.status(400).json({ error: "Passwords do not match!" });}

	// Usernames and Passwords must meet criteria:
  // >5 characters for username
  // >8 characters for password
	if (username.length < 5)
    {return res.status(400).json({ error: "Username must be at least 5 characters" });}

	if (password.length < 8)
    {return res.status(400).json({ error: "Password must be at least 8 characters" });}

	try {
		if (!(await universityEmailAuthentication(email)))
      {return res.status(400).json({ error: "Email must be a valid university email" });}

		const [emailResults] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
		// If email exists,
    // return error
		if (emailResults.length > 0)
      {return res.status(400).json({ error: "Email already exists" });}

		const [userResults] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
		// If username exists,
    // return error
		if (userResults.length > 0)
      {return res.status(400).json({ error: "Username already exists" });}

		// Hash the password with bcrypt
    // Insert into database
		const hash = await bcrypt.hash(password, 10);
		await connection.execute("INSERT INTO users (uuid, email, username, password_hash) VALUES (UUID(), ?, ?, ?)", [email, username, hash]);
		
    return res.json({ message: "User registered successfully" });//TODO: Status Code?
    
	} catch (err) {
		console.error("Error during registration:", err);
		return res.status(500).json({ error: "An error occurred during registration" });
	}
});

//TODO: LOGOUT

//TODO: CHANGE PASSWORD
