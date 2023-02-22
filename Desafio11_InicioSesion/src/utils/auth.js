function auth (req, res, next) {
    console.log(`Se llamo a AUTH ${req.session.nameSession}`)
    if(req.session?.nameSession){
        
        return next()
    };
    return res.render(`login`);
};

export default auth;