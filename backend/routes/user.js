const { Router } = require("express");
const { z } = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middlewares/userValidation");

const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().email(),
  password: z.string(),
});

const router = Router();

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (user) {
      return res.status(411).json({
        message: "Email already token / Invalid inputs",
      });
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
    });

    const hashedPassword = await newUser.createHash(req.body.password);
    newUser.password_hash = hashedPassword;

    const data = await newUser.save();

    const amount = await Account.create({
      userId: data._id,
      balance: 1 + Math.random() * 10000
    })

    res.json({
      message: "user created successfully",
      userId: data._id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  const signinSchema = z.object({
    username: z.string().email(),
    password: z.string(),
  });

  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect input",
    });
  }

  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(411).json({
        message: "User doesn't exist",
      });
    }
    if (await user.validateHash(req.body.password, user.password_hash)) {
      const token = await jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );
      res.json({
        message: "User Login successfully",
        token,
      });
    } else {
      res.status(411).json({
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const updateBody = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    username: z.string().email().optional(),
    password: z.string().optional(),
  });

  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Incorrect type of inputs",
    });
  }
  try {
    const data = await User.updateOne(
      {
        _id: req.userId,
      },
      req.body
    );
    res.json({
      message: "User information updated successfully",
    });
  } catch (error) {
    res.json({
      message: "Error while updating user information",
    });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  try {
    const users = await User.find({
      $or: [{
        firstName: {
          $regex: filter,
          $options: 'i'
          }
      }, {
        lastName: {
          $regex: filter,
          $options: 'i'
        }
      }]
    });
    res.json({
      users,
    });
  } catch (error) {
    res.status({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
