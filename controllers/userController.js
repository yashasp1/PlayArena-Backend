const express = require('express');
const bcryptUtil = require('../helpers/bcryptUtil');
const jwtUtil = require('../helpers/jwtUtil');
const { createUser, getUserByEmail } = require('../models/user');

const signup = async (req, res) => {
    try {
      const { FirstName, LastName, Email, Password } = req.body;
      
      const dupe = await getUserByEmail(Email);
      if(dupe.length > 0){
        return res.status(400).json({message: "Email Already exists"});
      }
      
      const hashedPassword = await bcryptUtil.hashPassword(Password);
  
      const result = await createUser({ FirstName, LastName, Email, Password: hashedPassword });
  
      res.json({ message:'User registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed' });
    }
  };

const signin = async (req, res) => {
    try {
      const { Email, Password } = req.body;
      const rows = await getUserByEmail(Email);
  
      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const user = rows[0];
      console.log(user.Email);
      const passwordMatch = await bcryptUtil.comparePassword(Password, user.Password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const token = jwtUtil.generateToken({ id: user.UserID, email: user.Email });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  };

  module.exports = {signup,signin};
