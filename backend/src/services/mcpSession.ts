let sessionId: string | null = null;

let initialized = false;

let serverInfo: any = null;


export function setSessionId(id: string) {
  sessionId = id;
}


export function getSessionId() {
  return sessionId;
}


export function setInitialized(value: boolean) {
  initialized = value;
}


export function isInitialized() {
  return initialized;
}


export function setServerInfo(info: any) {
  serverInfo = info;
}


export function getServerInfo() {
  return serverInfo;
}
