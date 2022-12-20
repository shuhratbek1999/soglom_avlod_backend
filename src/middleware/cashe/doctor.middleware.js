const client = require('../../startup/client');

function doctor(req, res, next) {
    client.get('doctor', (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.send(data);
        } else {
            next();
        }
    });
}
function doctorOne(req, res, next) {
    client.get('doctorOne', (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.send(data);
        } else {
            next();
        }
    });
}

module.exports = {
    doctor,
    doctorOne
};