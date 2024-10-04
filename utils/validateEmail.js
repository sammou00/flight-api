const validateEmail = (email) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (pattern.test(email)) {
        return true;
    } else {
        return false;
    }
};

export default validateEmail;
