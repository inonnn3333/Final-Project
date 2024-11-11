import { app } from "../../app.mjs";
import { User } from "./users.model.mjs";

app.get('/users', async (req, res) => {
    res.send(await User.find());
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(403).send({message: "User not found"});
    }

    //! Here I need to add a GUARD CONDITION.
    res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send({"message": "Internal Server Error"});
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const {
            name: {first, last},
            phone,
            email,
            password,
            address: {city, street, houseNumber},
            isAdmin,
            createAt,
            isActive,
        } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send({"message": "User not found"});
        }

        //! Need to add a VALIDATION.

        //! Need to check if the user that change the email gave the same email or he want to change it.
        // if (email && email !== user.email) {
        //     const sameEmailUser = await User.findOne({ email });
            // if (sameEmailUser && sameEmailUser.id !== req.params.id) {
            //     return res.status(403).send({"message": "Email already exists."});
            // }
        // }

        user.name = {
            first: first || user.name.first,
            last: last || user.name.last
        };
        user.phone = phone || user.phone;
        user.email = email || user.email;
        user.password = password || user.password; //! Need to add bcrypt.
        user.address = {
            city: city || user.address.city,
            street: street || user.address.street,
            houseNumber: houseNumber || user.address.houseNumber,
        };
        user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;
        user.createAt = createAt || user.createAt;
        user.isActive = isActive || user.isActive;

        await user.save();
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send({"message": "Internal Server Error"});
    }
});


app.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(403).send("User not found");
    
        user.isActive = !user.isActive;
        await user.save();
    
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send({"message": "Internal Server Error"});
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send({"meassage": "User is deleted"});
    } catch (err) {
        console.error(err);
        res.status(500).send({"message": "Internal Server Error"});
    }
});