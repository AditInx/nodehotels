import express from "express";
const router = express.Router();
import {Person} from "../models/Person.js";
import passport from "passport";
import jwtAuthMiddleware, {generateToken} from '../jwt.js';
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    const payload = {
      id: response.id,
      username: response.username
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(response.username);
    console.log("Token is : ", token);
    res.status(200).json({response:response, token:token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:work", async (req, res) => {
  try {
    const workType = req.params.work;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error:'Invalid work type'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id",passport.authenticate("local", { session: false }), async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id",passport.authenticate("local", { session: false }), async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data delete");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
