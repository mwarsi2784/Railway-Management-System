const isUserAuthenticate = (req, res, next) => {
    if (!req.session.user) {
        // return res.status(401).json({ error: "Unauthorized. Please log in." });
        res.render("userLogin");
    }
    next();
};

export default isUserAuthenticate;
