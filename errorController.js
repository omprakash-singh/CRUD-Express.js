const sendErrorDev = (err, res) => {
     res.status(err.statusCode).json({
          status: err.status,
          error: err,
          stack: err.stack,
          message: err.message

     });
};
const SendErrorProd = (err, res) => {
     // operational, trusted error: send to the client
     if (res.isOperational) {
          res.status(err.statusCode).json({
               status: err.status,
               message: err.message
          });

     } else {
          // Programming or other unknown error: don't leak error details
          console.error("ERROR", err);
          res.status(500).json({
               status: 'error',
               message: 'somethig went very wrong!.'
          })
     }

};

module.exports = (err, req, res, next) => {
     err.statusCode = err.statusCode || 500;
     err.status = err.status || 'error';
     if (process.env.NODE_ENV === 'development') {
          sendErrorDev(err, res);

     } else if (process.env.NODE_ENV === 'production') {
          SendErrorProd(err, res);
     }
}