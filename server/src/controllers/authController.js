import passport from "../config/passport.js";
import { getDB } from "../config/mongo.js";
import {
  buildSafeUser,
  getRoleForUsername,
  hashPassword,
} from "../config/passport.js";

export async function registerUser(req, res, next) {
  try {
    const db = getDB();
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      return res.status(400).json({ message: "Username is required." });
    }

    const existingUser = await db
      .collection(process.env.USERS_COLLECTION)
      .findOne({ username: trimmedUsername });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const newUser = {
      username: trimmedUsername,
      passwordHash: hashPassword(password),
      createdAt: new Date(),
    };

    const result = await db
      .collection(process.env.USERS_COLLECTION)
      .insertOne(newUser);

    const safeUser = {
      _id: result.insertedId,
      username: trimmedUsername,
      role: getRoleForUsername(trimmedUsername),
    };

    req.login(safeUser, (error) => {
      if (error) {
        return next(error);
      }

      return res.json({
        message: "registered",
        ...buildSafeUser(safeUser),
      });
    });
  } catch (error) {
    next(error);
  }
}

export function loginUser(req, res, next) {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Invalid username or password.",
      });
    }

    req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return res.json({
        message: "logged_in",
        ...buildSafeUser(user),
      });
    });
  })(req, res, next);
}

export function getCurrentUser(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  return res.json(buildSafeUser(req.user));
}

export function logoutUser(req, res, next) {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    if (req.session) {
      req.session.destroy((sessionError) => {
        if (sessionError) {
          return next(sessionError);
        }

        res.clearCookie("connect.sid");
        return res.json({ message: "logged_out" });
      });
    } else {
      return res.json({ message: "logged_out" });
    }
  });
}