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
        return done(null, false, { message: "Incorrect username." });
      }
      const isPasswordMatch = user.password === password ? true : false;
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