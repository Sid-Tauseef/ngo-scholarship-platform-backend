// src/features/members/member.controller.js
const {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} = require('./member.service');
const logger = require('../../utils/logger');

async function getMembersHandler(req, res, next) {
  try {
    const members = await getAllMembers();
    res.json({ success: true, data: members });
  } catch (err) {
    logger.error(`getMembersHandler error: ${err.message}`);
    next(err);
  }
}

async function createMemberHandler(req, res, next) {
  try {
    const member = await createMember(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    logger.error(`createMemberHandler error: ${err.message}`);
    next(err);
  }
}

async function updateMemberHandler(req, res, next) {
  try {
    const member = await updateMember(req.params.id, req.body);
    res.json({ success: true, data: member });
  } catch (err) {
    logger.error(`updateMemberHandler error: ${err.message}`);
    next(err);
  }
}

async function deleteMemberHandler(req, res, next) {
  try {
    await deleteMember(req.params.id);
    res.json({ success: true, message: 'Member deleted' });
  } catch (err) {
    logger.error(`deleteMemberHandler error: ${err.message}`);
    next(err);
  }
}

module.exports = {
  getMembersHandler,
  createMemberHandler,
  updateMemberHandler,
  deleteMemberHandler,
};
