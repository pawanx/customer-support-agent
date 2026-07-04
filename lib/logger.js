let logs = []

export function addLog(step,details){
    logs.push({
    id: Date.now(),
    step,
    details,
    timestamp: new Date().toLocaleTimeString(),
  });
}

export function getLogs() {
  return logs;
}

export function clearLogs() {
  logs = [];
}