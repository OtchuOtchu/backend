const user = require("../models/users.model");

async function getUser(req, res) {
  try {
    const userData = await user.getUserData();
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getUser };
