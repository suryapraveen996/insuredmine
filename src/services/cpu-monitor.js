const os = require('os');
const { exec } = require('child_process');

function getCPUUsage() {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach((cpu) => {
    for (type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });

  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

function restartServer() {
  exec('pm2 restart server', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error restarting server: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Server restarted: ${stdout}`);
  });
}

module.exports = {
  getCPUUsage,
  restartServer
}