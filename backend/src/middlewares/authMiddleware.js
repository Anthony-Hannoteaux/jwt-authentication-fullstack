import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // Check if the request's header exists and start with bearer (si il "porte" un token)
    const authHeader = req.headers.authorization
    if (typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Non autorisé." })
    }

    // Extract token only
    const token = authHeader.slice("Bearer ".length).trim()
    if (!token) {
        return res.status(401).json({ message: "Non autorisé." })
    }

    try {
        // Check token validity
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const userId = payload?.sub
        if (!userId) {
            return res.status(401).json({ message: "Non autorisé." })
        }

        req.auth = { userId }
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({ message: "Non autorisé." })
    }
}

export default authMiddleware;