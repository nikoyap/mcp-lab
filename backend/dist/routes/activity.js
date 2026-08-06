"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("../services/activity");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({
        success: true,
        activities: (0, activity_1.getActivities)()
    });
});
exports.default = router;
