const fs = require('fs');

let connection;
let channel;
let fsuipc;

const ENABLE_LOG = false;

function connect() {
    fsuipc = require('fsuipc');
    connection = new fsuipc.FSUIPC();
    channel = connection.open();
}

function update() {
    return channel
        .then((obj) => {
            obj.add('aircraftType', 0x3D00, fsuipc.Type.String, 256);

            obj.add('airspeed', 0x02BC, fsuipc.Type.Int32, 32);
            obj.add('altitude', 0x0570, fsuipc.Type.Int64, 64);
            obj.add('pitch', 0x0578, fsuipc.Type.Int32, 32);
            obj.add('bank', 0x057C, fsuipc.Type.Int32, 32);
            obj.add('heading', 0x0580, fsuipc.Type.UInt32, 32);
            obj.add('verticalSpeed', 0x02C8, fsuipc.Type.Int32, 32);

            obj.add('turnRate', 0x037C, fsuipc.Type.Int16, 16); // Signed turn rate for coordinator needle. -512=2minute Left, +512=2minute Right.
            obj.add('turnCoordinatorBall', 0x036E, fsuipc.Type.Int16, 16); // -128 to +127, turn coordinator ball position, +to right, - to left, 0 balanced

            obj.add('rpm', 0x2400, fsuipc.Type.Double, 64); // % rpm

            return obj.process();
        })
        .then((result) => {

            if (ENABLE_LOG) {
                console.log(`airspeed indicated ${result.airspeed / 128} knots`);
                console.log(`Altitude ${result.altitude*3.28084/(65536*65536)} feets`);
                console.log(`pitch ${result.pitch *360/(65536*65536)}º`);
                console.log(`bank ${result.bank *360/(65536*65536)}º`);
                console.log(`heading ${result.heading*360/(65536*65536)} º`);
                console.log(`verticalSpeed ${result.verticalSpeed*60*3.28084/256} feet/min`);
                console.log(`turn ${result.turnRate} ${result.turnCoordinatorBall} `);
                console.log(`rpm ${result.rpm} `);
            }

            const data = {
                airspeed: result.airspeed / 128,
                altitude: Math.round(result.altitude*3.28084/(65536*65536)),
                pitch: result.pitch *360/(65536*65536),
                bank: result.bank *360/(65536*65536),
                heading: Math.round(result.heading*360/(65536*65536)),
                verticalSpeed: result.verticalSpeed*60*3.28084/256,
                turnRate: result.turnRate,
                turnCoordinatorBall: result.turnCoordinatorBall,
                rpm:  Math.round(result.rpm)
            };

            fs.appendFile('sim-output.log', JSON.stringify(data) + '\n', function (err) {
                if (err) throw err;
                console.log('Saved!');
              });

            return data;

        })
        .catch((err) => {
            console.error(err);

            return channel.close();
        });
}

module.exports = {
    connect,
    update
};