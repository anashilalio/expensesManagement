import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/users.js";
import { comparePassword } from "../utils/helpers.mjs";
import { User } from "../schemas/user.js";

// called one time when login
// store user.id in session, so we use that id later to retreive his data from db
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// Called in every request made by a user after authentication
// use id in session to fetch user from db
// returns user object to session
passport.deserializeUser( async (id, done) => {
    try {
        const findUser = await User.findById(id)
        if(!findUser)
            throw new Error("User not found")
        done(null, findUser)
    } catch (error) {
        done(error, null)
    }
})


export default passport.use(
    new Strategy({ usernameField: "email"}, async (username, password, done) => {
        
        try {

            const findUser = await User.findOne({ email: username })

            if (!findUser) {
                return done(null, false, { message: "User not found" })
            }
            if (!comparePassword(password, findUser.password)) {
                return done(null, false, { message: "Wrong password" });
            }
            done(null, findUser)
        } catch (error) {
            done(error, null)
        }

    })
)