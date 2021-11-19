import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

//create a mock user and send its jwt token(for use in the frontend currently)
router.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "admin",
  };

  jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
    res.json({
      token,
    });
  });
});

//middleware that verifies whether requests have authentic jwt token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

export { router as authRouter, verifyToken };
