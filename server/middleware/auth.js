import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      res.status(403).send("Access Denied");
      return;
    }

    if (token.startsWith("Bearier ")) {
      token = token.split(" ")[1].trimLeft();
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    delete req.user.password;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
