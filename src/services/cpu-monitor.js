const os = require('os');
const { exec } = require('child_process');

// Function to get CPU usage
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

// Function to restart server
function restartServer() {
  console.log('Restarting server...');
  exec('pm2 restart <your_server_name_or_id>', (error, stdout, stderr) => {
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

// Set threshold for CPU usage
const CPU_THRESHOLD_PERCENT = 70;

// Check CPU usage periodically
setInterval(() => {
  const { idle, total } = getCPUUsage();
  const idlePercentage = 100 - ((idle / total) * 100);
  console.log(`Current CPU Usage: ${idlePercentage.toFixed(2)}%`);

  if (idlePercentage >= CPU_THRESHOLD_PERCENT) {
    restartServer();
  }
}, 5000); // Check every 5 seconds
