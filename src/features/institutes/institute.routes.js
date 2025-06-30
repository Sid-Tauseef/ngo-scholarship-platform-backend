// src/features/institutes/institute.routes.js
const { Router } = require("express");
const {
  getInstitutesHandler,
  createInstituteHandler,
  updateInstituteHandler,
  deleteInstituteHandler,
} = require("./institute.controller");

const { authenticate } = require("../../middleware/auth.middleware");
const { authorize } = require("../../middleware/rbac.middleware");

const router = Router();

// Only ADMIN can manage institutes
router.get("/", authenticate, authorize(["ADMIN"]), getInstitutesHandler);
router.post("/", authenticate, authorize(["ADMIN"]), createInstituteHandler);
router.put("/:id", authenticate, authorize(["ADMIN"]), updateInstituteHandler);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteInstituteHandler);

module.exports = router;
