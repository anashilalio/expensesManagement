import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/users.js";

// take user object that we validated and store it in session
// called one time when login
passport.serializeUser((user, done) => {
    console.log("serialize...");
    console.log(user);
    
    done(null, user.id)
})

// look for the user and attach it to the request
// use id in session to search for the user
passport.deserializeUser((id, done) => {
    console.log("deserialize...");
    
    try {
        const findUser = users.find((user) => user.id === id);
        if(!findUser)
            throw new Error("user not found")
        done(null, findUser)
    } catch (error) {
        done(error, null)
    }
})


export default passport.use(
    new Strategy((username, password, done) => {
        try {
            console.log(`username : ${username} / pw ${password}`);
            
            const findUser = users.find((user) => user.username === username);
            if (!findUser) {
                throw new Error("user don't exist")
            }
            if (findUser.password !== password) {
                throw new Error("wrong pw")
            }
            done(null, findUser)
        } catch (error) {
            done(error, null)
        }

    })
)