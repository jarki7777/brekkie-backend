// password must be between 8 and 32 characters, contain at least 1 lowercase letter,
// 1 uppercase letter, 1 number and one of this special characters '!#$%&?¿¡*-+.,:;<>'

export const validatePw = (pw) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&?¿¡*-+.,:;<>/])[A-Za-z\d[!#$%&?¿¡*-+.,:;<>/]{8,32}$/gm.test(pw);
}