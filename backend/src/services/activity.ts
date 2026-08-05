export type ActivityLog = {
  method: string;
  status: number;
  latency: number;
  timestamp: string;
  error?: string;
};


const activities: ActivityLog[] = [];


export function addActivity(
  activity: ActivityLog
){

  activities.unshift(
    activity
  );


  // keep latest 50
  if(activities.length > 50){

    activities.pop();

  }

}


export function getActivities(){

  return activities;

}
