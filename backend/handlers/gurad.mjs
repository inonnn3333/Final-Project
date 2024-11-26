import jwt from "jsonwebtoken";
import { Training } from "./trainings/trainings.model.mjs";

export const guard =  (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(401).send({message: "User is not authorized"});
        } else next();
    })
};



export const getUser = (req) => {
    if (!req.headers.authorization) {
        return null;
    }

    const user = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
    
    if (!user) {
        return null;
    }
    console.log(user);
    return user;
}