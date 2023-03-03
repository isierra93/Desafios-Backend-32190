export function checkAuthentication ( req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/login");
    }
};

export async function getLogOut(req, res, next){
    req.logout(function(err) {
        if (err) { return next(err); }
        next();
      });
}

export default {checkAuthentication, getLogOut};