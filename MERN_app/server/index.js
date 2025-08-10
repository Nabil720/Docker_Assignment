const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://User1:t0xESB6nye1qSRj3@user.rt4xdcf.mongodb.net/UserDB?retryWrites=true&w=majority");

app.get('/', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
  const { id } = req.params;

  UserModel.findById(id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: "Failed to get user", details: err }));
});

app.post("/createUser", (req, res) => {
  const { name, email, age } = req.body;

  UserModel.create({ name, email, age })
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Failed to create user" });
    });
});


app.delete('/deleteUser/:id', (req, res) => {
  const { id } = req.params;

  UserModel.findByIdAndDelete(id)
    .then(deletedUser => {
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});



app.put('/updateUser/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    console.log("Update request:", id, name, email, age);
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});



app.listen(5050, () => {
  console.log("Server is running on port 5050");
});
