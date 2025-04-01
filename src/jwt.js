import jwt from 'jsonwebtoken';


const jwtAuthMiddleware = (req,res,next) =>{
    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unauthorized'});

    try {

        //verify the JWT token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({error:'Invalid Token'});
    }
}

export const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign({user: userData}, process.env.JWT_SECRET,{expiresIn: 30});
}

export default jwtAuthMiddleware;