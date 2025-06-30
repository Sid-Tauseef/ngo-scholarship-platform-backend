const { getMemberStats, getAdminStats , getInstituteStats  } = require('./dashboard.service');




async function instituteStatsHandler(req, res, next) {
    try {
      const data = await getInstituteStats();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
  
async function memberStatsHandler(req, res, next) {
  try {
    const data = await getMemberStats();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

async function adminStatsHandler(req, res, next) {
  try {
    const data = await getAdminStats();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

module.exports = { memberStatsHandler, adminStatsHandler , instituteStatsHandler };
