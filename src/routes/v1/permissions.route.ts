import PermissionsControllers from "@controllers/permissions.controllers";
import express from "express";

const PermissionsRouter = express.Router();

PermissionsRouter.post("/create", PermissionsControllers.createPermissions);

export default PermissionsRouter;
