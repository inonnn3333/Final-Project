import { Training } from "./handlers/trainings/trainings.model.mjs";
import jwt from "jsonwebtoken";


export const getUser = (req) => {
    if (!req.headers.authorization) {
        return null;
    }

    const user = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);

    if (!user) {
        return null;
    }

    return user;
}