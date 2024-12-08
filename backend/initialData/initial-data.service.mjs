import { User } from "../handlers/users/users.model.mjs";
import { Training } from "../handlers/trainings/trainings.model.mjs";
import { initialData as data } from "./initial-data.mjs";
import bcrypt from "bcrypt";
import moment from "moment";

(async () => {
    const userAmount = await User.find().countDocuments();

    if (!userAmount) {
        const userIds = [];

        // הוספת משתמשים
        for (const u of data.users) {
            const user = new User(u);

            user.password = await bcrypt.hash(user.password, 10);
            user.createAt = moment().format("MMMM Do YYYY, h:mm:ss a");

            const obj = await user.save();

            if (obj.isAdmin || true) { // שמירה של כל ה-ID של המשתמשים
                userIds.push(obj._id);
            }
        }

        // הוספת אימונים עם משתתפים
        for (const t of data.trainings) {
            const training = new Training(t);

            // יצירת רשימת משתתפים רנדומלית
            const participants = [];
            const maxParticipants = Math.floor(Math.random() * (userIds.length - 1)) + 5; // מספר משתתפים רנדומלי (בין 5 ל-userIds.length)

            while (participants.length < maxParticipants) {
                const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
                if (!participants.includes(randomUserId)) {
                    participants.push(randomUserId); // הוספת משתמש ייחודי
                }
            }

            training.participants = participants;

            // בחירת משתמש אקראי ל-user_id של האימון
            const randomIndex = Math.floor(Math.random() * userIds.length);
            training.user_id = userIds[randomIndex];

            await training.save();
        }
    }
})();
