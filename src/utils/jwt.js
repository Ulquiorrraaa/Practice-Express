import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{
        expiresIn: "7d",
    });

    const cookieOptions =  {
        expires : new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly : true,
        secure : process.env.NODE_ENV = "production",
        sameSite : "Lax",
    };

    res.cookie("token", token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {user},
    })
}
