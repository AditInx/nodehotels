import express from "express";
const router = express.Router();
import { MenuItem } from "../models/MenuItem.js";
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (tasteType == "sour" || tasteType == "spicy" || tasteType == "sweet") {
      const data = await MenuItem.find({ taste: tasteType });
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const MenuId = req.params.id;
    const MenuData = req.body;
    const response = await MenuItem.findByIdAndUpdate(MenuId, MenuData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ error: "MenuItem not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const MenuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(MenuId);
    if (!response) {
      res.status(404).json({ error: "MenuItem not found" });
    }
    res.status(200).json({ message: "Menu Item deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;