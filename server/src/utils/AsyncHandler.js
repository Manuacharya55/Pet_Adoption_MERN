
export const AsyncHandler = (handlerFunction) => {
    return (req,res,next)=>{
        return Promise.resolve(handlerFunction(req,res,next)).catch(err=> next(err))
    }
}