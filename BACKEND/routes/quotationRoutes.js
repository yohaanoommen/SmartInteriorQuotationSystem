import express from "express";
import Quotation from "../models/Quotation.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const quotation = await Quotation.create(req.body);

    res.status(201).json(quotation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;