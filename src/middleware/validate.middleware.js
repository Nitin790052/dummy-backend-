export const validateUser = (req, res, next) => {

    console.log("DEBUG: req.body =", req.body);
    console.log("DEBUG: req.file =", req.file);
    const { firstName, email, age } = req.body;

    if (!firstName) return res.status(400).json({ success: false, message: "Name is required", debug_body: req.body });
    if (!email) return res.status(400).json({ success: false, message: "Email is required", debug_body: req.body });
    if (!age) return res.status(400).json({ success: false, message: "Age is required", debug_body: req.body });

    if (!req.file && req.method === "POST") {
        return res.status(400).json({
            success: false,
            message: "Image is required",
            debug_body: req.body
        });
    }

    next();
};