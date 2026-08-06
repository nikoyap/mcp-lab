export type ActivityLog = {
    method: string;
    status: number;
    latency: number;
    timestamp: string;
    error?: string;
};
export declare function addActivity(activity: ActivityLog): void;
export declare function getActivities(): ActivityLog[];
//# sourceMappingURL=activity.d.ts.map