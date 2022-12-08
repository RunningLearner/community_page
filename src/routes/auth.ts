import { Request, Response, Router } from "express";

const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  console.log("email::", email);
};

const router = Router();
router.post("/register", register);

export default router;
