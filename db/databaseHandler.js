import { DatabaseError } from '../errors/DatabaseError.js';

const databaseHandler = (fn, errorMessage = '500: Database error') => {
    return async (...args) => {
        const fnReturn = fn(...args);
        return Promise.resolve(fnReturn).catch(() => {
            throw new DatabaseError(errorMessage);
        });
    }
}

export { databaseHandler }