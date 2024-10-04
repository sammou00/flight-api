import { v4 as Id } from 'uuid';

const flights = [
    {
        id: '1',
        from: 'Paris',
        to: 'New York',
        date: '2021-08-01',
        price: 800,
        company: 'Air France'
    },
    {
        id: Id(),
        from: 'Paris',
        to: 'New York',
        date: '2021-08-01',
        price: 800,
        company: 'Air France'
    }
];

class Flight {
    static getAll() {
        return flights;
    }

    static getById(id) {
        return flights.find((flight) => flight.id === id);
    }

    static add(flight) {
        const newFlight = {
            id: Id(),
            ...flight
        };
        flights.unshift(newFlight);
        return newFlight;
    }

    static update(id, flight) {
        const updateFlight = flights.find((flight) => flight.id === id);
        if (updateFlight) {
            updateFlight.from = flight.from;
            updateFlight.to = flight.to;
            updateFlight.date = flight.date;
            updateFlight.price = flight.price;
            updateFlight.company = flight.company;
        }
    }

    static delete(id) {
        const index = flights.findIndex((flight) => flight.id === id);
        flights.splice(index, 1);
        return { id };
    }
}

export default Flight;
