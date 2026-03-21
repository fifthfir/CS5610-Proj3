export function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Login required." });
    }

    next();
}

export function requireAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: "Login required." });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Admin access required." });
    }

    next();
}