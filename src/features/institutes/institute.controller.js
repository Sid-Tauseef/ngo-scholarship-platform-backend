// src/features/institutes/institute.controller.js
const {
  getAllInstitutes,
  createInstitute,
  updateInstitute,
  deleteInstitute,
} = require("./institute.service");
const logger = require("../../utils/logger");

async function getInstitutesHandler(req, res, next) {
  try {
    const institutes = await getAllInstitutes();
    res.json({ success: true, data: institutes });
  } catch (err) {
    logger.error(`getInstitutesHandler error: ${err.message}`);
    next(err);
  }
}

async function createInstituteHandler(req, res, next) {
  try {
    const institute = await createInstitute(req.body);
    res.status(201).json({ success: true, data: institute });
  } catch (err) {
    logger.error(`createInstituteHandler error: ${err.message}`);
    next(err);
  }
}

async function updateInstituteHandler(req, res, next) {
  try {
    const institute = await updateInstitute(req.params.id, req.body);
    res.json({ success: true, data: institute });
  } catch (err) {
    logger.error(`updateInstituteHandler error: ${err.message}`);
    next(err);
  }
}

async function deleteInstituteHandler(req, res, next) {
  try {
    await deleteInstitute(req.params.id);
    res.json({ success: true, message: "Institute deleted" });
  } catch (err) {
    logger.error(`deleteInstituteHandler error: ${err.message}`);
    next(err);
  }
}

module.exports = {
  getInstitutesHandler,
  createInstituteHandler,
  updateInstituteHandler,
  deleteInstituteHandler,
};
