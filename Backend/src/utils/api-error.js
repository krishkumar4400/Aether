class ApiError extends Error{
    ApiError(statusCode, message="Something went wrong", data) {
        throw new Error();
    }
}