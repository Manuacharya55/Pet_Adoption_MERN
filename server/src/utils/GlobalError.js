
export const GlobalErrorHandler = (err,req,res,next) =>{
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong"
    let success = false;
    
    res.status(statusCode).json({
        success,
        statusCode,
        message
    })
}