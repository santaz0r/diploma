function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "Имя пользователя или пароль введены неверно";
        case "INVALID_PASSWORD":
            return "Имя пользователя или пароль введены неверно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким e-mail уже существует";
        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
}
export default generateAuthError;
