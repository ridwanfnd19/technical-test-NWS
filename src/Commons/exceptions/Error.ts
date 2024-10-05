// errors.ts
abstract class ClientError extends Error {
    public statusCode: number;

    constructor(message: any, statusCode = 400) {
        super(message);

        if (new.target === ClientError) {
            throw new Error('Cannot instantiate abstract class ClientError directly');
        }

        this.statusCode = statusCode;
        this.name = 'ClientError';
    }
}

class ValidationError extends ClientError {
    constructor(message: any = 'Invalid input') {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

export { ClientError, ValidationError };

  