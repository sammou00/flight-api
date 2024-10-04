import { v4 as Id } from 'uuid';

const users = [
    {
        id: Id(),
        email: 'sam@gmail.com',
        password: '$2b$10$/BAcosPNRvjHE5JOe.400e5snn8v9ZB1sQ7i5pWBermrJsWhUgTn6'
    }
];

class User {
    static getByEmail(email) {
        return users.find((user) => user.email === email);
    }

    static add(user) {
        const newUser = {
            id: Id(),
            ...user
        };
        users.push(newUser);
        return newUser;
    }
}

export default User;
