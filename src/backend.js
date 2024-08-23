const fs = require('fs');
module.exports = function(app, connection, config) {
    logger("Backend Loaded!", { color: "green", title: "Backend" });

    process.on('uncaughtException', async (err) => {
        if(err.toString().includes('EADDRINUSE')) return logger(`A process is already using this port (${config.siteInformation.processPort}).`, {color: 'red', title: 'ERROR'});
        if(config.siteInformation?.developerMode) return;
        const createdAt = Date.now();
        process.report.writeReport(`./etc/errors/error-${createdAt}-${process.pid}.json`, err);
    
    });
}