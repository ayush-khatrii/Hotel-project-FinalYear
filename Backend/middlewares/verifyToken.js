import jwt from "jsonwebtoken";


// export const verifyToken = (req, res, next) => {
//     // const token = req.headers['authorization'];
//     const token = req.headers.authorization.split(' ')[1];

//     if (!token)
//         return res.status(401).json({ message: "You are not authenticated!" });

//     jwt.verify(token, process.env.JWT, (err, user) => {
//         if (err) {
//             return res.status(401).json({ message: "Token is not valid!" });
//         }
//         req.user = user;
//         console.log(req.user);
//         next();
//     });
// }



export const verifyToken = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            // Get token from auth headers
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            jwt.verify(token, process.env.JWT, (err, user) => {
                if (err) {
                    return res.status(401).json({ message: "not authorized!!" });
                }
                req.user = user;
                next();
            });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Not authorized" });
        }
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized ! token not found" });
    }
}




export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json({ message: "You are not authorized!" });
        }
    })
}
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json({ message: "You are not authorized!" });
        }
    })
}

export const verifyUserOrAdmin = (req, res, next) => {
    if (req.user && req.user.id) {
        return verifyUser(req, res, next);
    } else {
        return verifyAdmin(req, res, next);
    }
}