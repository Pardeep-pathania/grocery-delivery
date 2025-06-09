
import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "Unauthorised access, please Login first" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(401).json({ message: "User doesn't have a valid token" });
        }

        req.user = { id: verifyToken.id };

        next();

    } catch (error) {
        return res.status(500).json({ message: `isAuth error ${error}` });
    }
}

export default authUser;

