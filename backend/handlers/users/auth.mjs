import { app } from "../../app.mjs";
import { User } from "./users.model.mjs";
import moment from 'moment';
import bcrypt from "bcrypt";


app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !password) {
        return res.status(403).send({"message":"Email or password is inncorect"});
    }
    if (!user.password || !await bcrypt.compare(password, user.password)) {
        return res.status(403).send({"message":"Email or password is inncorect"});
    }

    res.send([user.name.first, user.name.last, user.email, user.isAdmin, user.isActive]);

});


app.post('/users', async (req, res) => {
    try {
        const {
            name: {first, last},
            phone,
            email,
            password,
            address: {city, street, houseNumber},
            isAdmin,
            isBussiness,
            createAt,
        } = req.body;

        // const validate = UserSignup.validate(req.body);
        // if (validate.error) {
        //     return res.status(400).send({"ValidateError": validate.error.details[0].message.replace(/"/g, '')});
        // }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).send({"message": "Email already exists"});
        }

        const user = new User({
            name: {first, last},
            phone,
            email,
            password: await bcrypt.hash(password, 10),
            address: {city, street, houseNumber},
            isAdmin,
            isBussiness,
            createAt: moment().format('YYYY-MM-DD HH:mm'),
        });

        const newUser = await user.save();

        res.send(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send({"message": "Internal Server Error"});
    }
});