import { Router, Request, Response } from "express";
import v1router from "./v1";
import { StatusCodes } from "http-status-codes";

function rootGet(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    message:
      "Welcome to SMS with RBAC - Student Management system with Role based access control",
    data: {
      availableRoutes: ["/api/v1"],
    },
    status: true,
    github: "https://github.com/kamathAnmol/SMS-with-RBAC",
  });
}

const router = Router();
router.use("/api/v1", v1router);
router.get("/", rootGet);

export default router;
