import crypto from "crypto";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ObjectId } from "mongodb";
import { getDB } from "./mongo.js";

export function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

export function getAdminUsernames() {
    return (process.env.ADMIN_USERNAMES || "")
        .split(",")
        .map((name) => name.trim().toLowerCase())
        .filter(Boolean);
}

export function getRoleForUsername(username = "") {
    return getAdminUsernames().includes(username.trim().toLowerCase())
        ? "admin"
        : "user";
}

export function buildSafeUser(user) {
    return {
        userId: String(user._id),
        username: user.username,
        role: user.role || getRoleForUsername(user.username),
    };
}

export function configurePassport() {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const trimmedUsername = username?.trim();

                if (!trimmedUsername || !password) {
                    return done(null, false, {
                        message: "Invalid username or password.",
                    });
                }

                const db = getDB();

                const user = await db
                    .collection(process.env.USERS_COLLECTION)
                    .findOne({ username: trimmedUsername });

                if (!user) {
                    return done(null, false, {
                        message: "Invalid username or password.",
                    });
                }

                const incomingHash = hashPassword(password);

                if (incomingHash !== user.passwordHash) {
                    return done(null, false, {
                        message: "Invalid username or password.",
                    });
                }

                return done(null, {
                    _id: user._id,
                    username: user.username,
                    role: getRoleForUsername(user.username),
                });
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, String(user._id));
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const db = getDB();

            const user = await db
                .collection(process.env.USERS_COLLECTION)
                .findOne({ _id: new ObjectId(id) });

            if (!user) {
                return done(null, false);
            }

            return done(null, {
                _id: user._id,
                username: user.username,
                role: getRoleForUsername(user.username),
            });
        } catch (error) {
            return done(error);
        }
    });
}

export default passport;