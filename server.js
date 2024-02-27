const http = require('http')
const app = require('./src/app');
const  { getCPUUsage, restartServer } = require('./src/services/cpu-monitor')
const PORT = 8082;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const CPU_THRESHOLD_PERCENT = 70;

setInterval(() => {
  const { idle, total } = getCPUUsage();
  const idlePercentage = 100 - ((idle / total) * 100);
  console.log(`Current CPU Usage: ${idlePercentage.toFixed(2)}%`);

  if (idlePercentage >= CPU_THRESHOLD_PERCENT) {
    restartServer();
  }
}, 5000);

module.exports = app;
