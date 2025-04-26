module.exports = (err, req, res, next) => {
    let { statusCode = 500, message = 'An Unexpected Error Occured...' } = err;
    console.error(err);
    res.status(statusCode).json({ success: false, message });
    // next();
}