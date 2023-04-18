import passport from "passport";
import passportService from "../../Service/passport/passportService.js";

passport.use("signin", passportService.Signin);

passport.use("login", passportService.Login);

passport.serializeUser(passportService.Serializar);

passport.deserializeUser(passportService.Deserializar);

export default passport;