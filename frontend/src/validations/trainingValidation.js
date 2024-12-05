import Joi from "joi";

export const trainingSchema = Joi.object({
    trainingName: Joi.string()
        .pattern(/^[A-Za-zא-ת\s]+$/)
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "יש להזין שם לשיעור",
            "string.min": "שם השיעור חייב להכיל לפחות 3 תווים",
            "string.max": "שם השיעור לא יכול לעלות על 50 תווים",
            "string.pattern.base": "שם השיעור יכול לכלול רק אותיות (ללא מספרים או סימנים)",
        }),
    trainingDetailes: Joi.string()
        .min(5)
        .max(200)
        .required()
        .messages({
            "string.empty": "יש להזין תיאור לשיעור",
            "string.min": "תיאור השיעור חייב להיות לפחות 5 תווים",
            "string.max": "תיאור השיעור לא יכול לעלות על 50 תווים",
        }),
    trainingTime: Joi.object({
        date: Joi.date()
            .required()
            .messages({
                "date.base": "תאריך השיעור חייב להיות תאריך חוקי",
                "any.required": "יש להזין תאריך לשיעור",
            }),
        time: Joi.string()
            .required()
            .messages({
                "string.empty": "יש להזין שעה לשיעור",
            }),
        length: Joi.number()
            .min(1)
            .max(300)
            .required()
            .messages({
                "number.base": "אורך השיעור חייב להיות מספר",
                "number.min": "אורך השיעור חייב להיות לפחות דקה אחת",
                "number.max": "אורך השיעור לא יכול לעלות על 300 דקות",
            }),
    }),
    trainingGuideDetails: Joi.object({
        first: Joi.string()
            .pattern(/^[A-Za-zא-ת]+$/)
            .min(2)
            .max(50)
            .required()
            .messages({
                "string.empty": "יש להזין שם פרטי של המדריך/ה",
                "string.min": "שם פרטי חייב להכיל לפחות 2 תווים",
                "string.max": "שם פרטי לא יכול לעלות על 50 תווים",
                "string.pattern.base": "שם פרטי יכול לכלול רק אותיות (ללא מספרים או סימנים)",
            }),
        last: Joi.string()
            .pattern(/^[A-Za-zא-ת]+$/)
            .min(2)
            .max(50)
            .required()
            .messages({
                "string.empty": "יש להזין שם משפחה של המדריך/ה",
                "string.min": "שם משפחה חייב להכיל לפחות 2 תווים",
                "string.max": "שם משפחה לא יכול לעלות על 50 תווים",
                "string.pattern.base": "שם משפחה יכול לכלול רק אותיות (ללא מספרים או סימנים)",

            }),
        phone: Joi.string()
            .pattern(/^\d{10}$/)
            .required()
            .messages({
                "string.empty": "יש להזין מספר טלפון",
                "string.pattern.base": "מספר הטלפון חייב להכיל 10 ספרות",
            }),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                "string.empty": "יש להזין כתובת אימייל",
                "string.email": "כתובת האימייל חייבת להיות בפורמט תקין",
            }),
    }),
});
