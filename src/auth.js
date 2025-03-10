import passport from "passport";
import { Person } from "./models/Person.js";
import Strategy from "passport-local";
const LocalStrategy = Strategy.Strategy;
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received credentials: ", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) {
        console.log("User not found in database");
        return done(null, false, { message: "Incorrect username." });
      }
      console.log("User found:",user);

      console.log("Entered Password: ", password);
      console.log('Stored hashed password: ',user.password);
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;