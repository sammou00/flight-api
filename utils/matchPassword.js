const matchPassword = (password, rePassword) => {
    if (password === rePassword) {
        return true;
    } else {
        return false;
    }
};

export default matchPassword;
