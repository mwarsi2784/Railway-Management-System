const isAdminAuthenticate = (req, res, next) => {
    if (!req.session.admin) {
        res.render("adminLogin");
        // return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    next();
};

export default isAdminAuthenticate;
