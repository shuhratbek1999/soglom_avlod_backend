const client = require('../../startup/client');

function inspection(req, res, next) {
    client.get('inspection', (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.send(data);
        } else {
            next();
        }
    });
}
function inspectionOne(req, res, next) {
    client.get('inspectionOne', (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.send(data);
        } else {
            next();
        }
    });
}

module.exports = {
    inspection,
    inspectionOne
};