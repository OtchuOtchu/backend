const user = require("../models/users.model");

async function getUser(req, res) {
  try {
    const userId = Number(req.params.userId);
    const userData = await user.getUserData(userId);
    console.log(userData);

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  try {
    const userData = req.body;

    const updatedUser = await getUpdateUserData({
      name: userData.name,
      email: userData.email,
      height: userData.height,
      weight: userData.weight,
      style: userData.style,
      sex: userData.sex,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user information" });
  }
}

module.exports = { getUser, updateUser };
