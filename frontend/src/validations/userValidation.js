import Joi from "joi";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/;

export const UserSignup = Joi.object({
    name: Joi.object({
        first: Joi.string()
            .pattern(/^[A-Za-zא-ת]+$/)
            .min(2)
            .max(15)
            .required()
            .messages({
                "string.base": "שם פרטי חייב להיות מחרוזת",
                "string.empty": "שם פרטי הוא שדה חובה",
                "string.min": "שם פרטי חייב להיות לפחות 3 תווים",
                "string.max": "שם פרטי לא יכול לעלות על 15 תווים",
                "string.pattern.base": "שם פרטי יכול לכלול רק אותיות (ללא מספרים או סימנים)",
            }),
        last: Joi.string()
            .pattern(/^[A-Za-zא-ת]+$/)
            .min(3)
            .max(15)
            .required()
            .messages({
                "string.base": "שם משפחה חייב להיות מחרוזת",
                "string.empty": "שם משפחה הוא שדה חובה",
                "string.min": "שם משפחה חייב להיות לפחות 3 תווים",
                "string.max": "שם משפחה לא יכול לעלות על 15 תווים",
                "string.pattern.base": "שם משפחה יכול לכלול רק אותיות (ללא מספרים או סימנים)",
            }),
    }).required().messages({
        "object.base": "שם הוא אובייקט חובה",
    }),
    phone: Joi.string()
        .required()
        .min(9)
        .max(15)
        .regex(/^[0-9]+$/)
        .messages({
            "string.base": "מספר טלפון חייב להיות מחרוזת",
            "string.empty": "מספר טלפון הוא שדה חובה",
            "string.min": "מספר טלפון חייב להיות לפחות 9 ספרות",
            "string.max": "מספר טלפון לא יכול לעלות על 15 ספרות",
            "string.pattern.base": "מספר טלפון יכול לכלול רק ספרות",
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.base": "אימייל חייב להיות מחרוזת",
            "string.empty": "אימייל הוא שדה חובה",
            "string.email": "כתובת האימייל חייבת להיות בפורמט חוקי",
        }),
    password: Joi.string()
        .regex(passwordRegex)
        .required()
        .messages({
            "string.empty": "סיסמה היא שדה חובה",
            "string.pattern.base": "סיסמה חייבת לכלול לפחות אות גדולה, אות קטנה, מספר ותו מיוחד, ולהיות באורך של 9 עד 30 תווים",
        }),
    address: Joi.object({
        city: Joi.string()
            .required()
            .messages({
                "string.empty": "עיר היא שדה חובה",
            }),
        street: Joi.string()
            .required()
            .messages({
                "string.empty": "רחוב הוא שדה חובה",
            }),
        houseNumber: Joi.string()
            .min(1)
            .max(4)
            .required()
            .messages({
                "string.empty": "מספר בית הוא שדה חובה",
                "string.min": "מספר בית  חייב להיות לפחות תו אחד",
                "string.max": "מספר בית לא יכול לעלות על 4 תווים",
            }),
    }).required().messages({
        "object.base": "כתובת היא שדה חובה",
    }),
    isAdmin: Joi.boolean().optional(),
    createAt: Joi.string().optional(),
});

export const EditUser = Joi.object({
    name: Joi.object({
        first: Joi.string()
            .pattern(/^[A-Za-zא-ת]+$/)
            .min(2)
            .max(15)
            .required()
            .messages({
                "string.base": "שם פרטי חייב להיות מחרוזת",
                "string.empty": "שם פרטי הוא שדה חובה",
                "string.min": "שם פרטי חייב להיות לפחות 3 תווים",
                "string.max": "שם פרטי לא יכול לעלות על 15 תווים",
                "string.pattern.base": "שם פרטי יכול לכלול רק אותיות (ללא מספרים או סימנים)",
            }),
        last: Joi.string()
            .pattern(/^[A-Za-zא-ת]+$/)
            .min(3)
            .max(15)
            .required()
            .messages({
                "string.base": "שם משפחה חייב להיות מחרוזת",
                "string.empty": "שם משפחה הוא שדה חובה",
                "string.min": "שם משפחה חייב להיות לפחות 3 תווים",
                "string.max": "שם משפחה לא יכול לעלות על 15 תווים",
                "string.pattern.base": "שם משפחה יכול לכלול רק אותיות (ללא מספרים או סימנים)",
            }),
    }).required().messages({
        "object.base": "שם הוא אובייקט חובה",
    }),
    phone: Joi.string()
        .required()
        .min(9)
        .max(15)
        .regex(/^[0-9]+$/)
        .messages({
            "string.base": "מספר טלפון חייב להיות מחרוזת",
            "string.empty": "מספר טלפון הוא שדה חובה",
            "string.min": "מספר טלפון חייב להיות לפחות 9 ספרות",
            "string.max": "מספר טלפון לא יכול לעלות על 15 ספרות",
            "string.pattern.base": "מספר טלפון יכול לכלול רק ספרות",
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages({
            "string.base": "אימייל חייב להיות מחרוזת",
            "string.empty": "אימייל הוא שדה חובה",
            "string.email": "כתובת האימייל חייבת להיות בפורמט חוקי",
        }),
    password: Joi.string()
        .regex(passwordRegex)
        .messages({
            "string.empty": "סיסמה היא שדה חובה",
            "string.pattern.base": "סיסמה חייבת לכלול לפחות אות גדולה, אות קטנה, מספר ותו מיוחד, ולהיות באורך של 9 עד 30 תווים",
        }),
    address: Joi.object({
        city: Joi.string()
            .required()
            .messages({
                "string.empty": "עיר היא שדה חובה",
            }),
        street: Joi.string()
            .required()
            .messages({
                "string.empty": "רחוב הוא שדה חובה",
            }),
        houseNumber: Joi.string()
            .required()
            .messages({
                "string.empty": "מספר בית הוא שדה חובה",
            }),
    }).required().messages({
        "object.base": "כתובת היא שדה חובה",
    }),
    isAdmin: Joi.boolean().optional(),
    createAt: Joi.string().optional(),
});
