export const Validator = {

    messages: {
        email: 'Incorrect email format',
        password: 'Password must contains at least 7 characters',
    },

    email(value) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return !!value.match(validRegex);
    },
    password(value) {
        const validRegex = /^[A-Za-z]\w{7,14}$/;
        return !!value.match(validRegex);
    },

    payloadValidation(fields) {
        const errors = [];
        for (const [field, value] of Object.entries(fields)) {
            console.log(field, value);
            if (!value) {
                errors.push(`Field ${field} is required`);
                continue;
            }
            if (!this[field](value)) {
                errors.push(this.messages[field]);
                continue;
            }
        }

        console.log(errors);

        return errors.length ? errors : true;
    }
}