const emailRegex = `/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i`;

export const validateEmail = (email) => {
    return String(email).toLowerCase().match(emailRegex);
};