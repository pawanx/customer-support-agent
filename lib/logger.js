let logs = []

export function addLog(step,details){
    logs.push({
    id: crypto.randomUUID(),
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