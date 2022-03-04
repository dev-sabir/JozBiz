import { v4 as uuid } from "uuid";
import usersDatabase from "../DB/model/usersDatabase.js";


//GETTING ALL USERS FROM DATABASE
export const getUsers = async (req, res) => {
  try {
    const allUsers = await usersDatabase.find({});
    return res.send(allUsers);
  } catch (err) {
    console.log(err)
    return res.status(500).send({ ERROR: "Some Error" });
  }
};


//ADDING AN USER TO DATABASE
export const createUser = async (req, res) => {
  try {
    const user = { username: req.body.username, _id: uuid() };
    await usersDatabase.create(user);
    return res.status(200).send({ Success: { id: user._id } });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ Error: "Data Not Added" });
  }
};


//GETTING A SINGLE USER
export const getUser = async (req, res) => {
  try {
    const user = await usersDatabase.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ "Not Found": "User Not Found" })
    }
    return res.status(200).send(user);
  } catch (err) {
    console.log(err)
    return res.status(500).send({ ERROR: "Some Error" });
  }
};


//DELETING AN USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersDatabase.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ "Not Exist": `User with ${id} don't exist!!!` });
    }
    return res.status(200).send({ Success: `User with ${id} deleted` });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ ERROR: 'Some Error' })
  }
};


//UPDATING AN USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await usersDatabase.findByIdAndUpdate(id, {

      username: req.body.username,
    });
    console.log(success)
    if (!success) {
      return res.status(404).send({ Error: "Not Updated" });
    }
    return res
      .status(200)
      .send({ Success: `Username of user id ${id} updated` });
  } catch (err) {
    console.log(err)
    res.status(500).send({ Error: "Some Error" })
  }
};
