import RolesConroller from "@controllers/roles.controllers";
import express from "express";

const RolesRouter = express.Router();

RolesRouter.get("/getAllRoles", RolesConroller.getAll);
RolesRouter.post("/addRole", RolesConroller.createNew);

export default RolesRouter;
