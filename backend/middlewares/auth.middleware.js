import jwt from 'jsonwebtoken'
import AppError from '../utils/error.utils.js';

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }
  try {
    // Decoding the token using jwt package verify method
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new AppError("Unauthorized, please login to continue", 401));
    }

    // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
    req.user = decoded;

    // Do not forget to call the next other wise the flow of execution will not be passed further
    next();
  }
  catch (error) {
    console.error("JWT Verification Error:", error);
    return next(new AppError("Unauthorized, please login to continue", 401));
  }
}

export default isLoggedIn;