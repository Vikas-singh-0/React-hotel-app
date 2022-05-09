import { expressjwt } from "express-jwt"
export const requiresLogin =expressjwt({
        secret:process.env.JWT_SECRET,
        algorithms:["HS256"]
})