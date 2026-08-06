"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addActivity = addActivity;
exports.getActivities = getActivities;
const activities = [];
function addActivity(activity) {
    activities.unshift(activity);
    // keep latest 50
    if (activities.length > 50) {
        activities.pop();
    }
}
function getActivities() {
    return activities;
}
