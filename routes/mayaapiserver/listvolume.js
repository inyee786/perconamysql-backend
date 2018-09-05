const express = require("express");
const router = express();
const http = require('request');




var options = {
    url: `http://${process.argv[5]}:5656/latest/volumes/`,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'namespace': `${process.argv[4]}`
    }
};

http.get(options, function (err, resp, body) {
    var volumeStatus = [];
    if (err) {
        console.log("this is volume erro namespaces ");
    } else {
        data = JSON.parse(body);
        console.log(JSON.stringify(data.items));
        console.log("this is volume lis http");

        for (i = 0; i < data.items.lenght; i++) {
            volumeStatus.push({
                volumeName: data.items[i].metadata.name,
                controllerStatus: data.items[i].metadata.annotations['vsm.openebs.io/controller-status'],
                replicaCount: data.items[i].metadata.annotations['vsm.openebs.io/replica-count'],
                replicaStatus: data.items[i].metadata.annotations['vsm.openebs.io/replica-status'],
                capacity: data.items[i].metadata.annotations['vsm.openebs.io/volume-size'],
            });
        }
    }
});

function getvolume() {
    var options = {
        url: `http://${process.argv[5]}:5656/latest/volumes/`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'namespace': `${process.argv[4]}`
        }
    };
    return new Promise(function (resolve, reject) {
        http.get(options, function (err, resp, body) {
            var volumeStatus = [];
            if (err) {
                console.log("this is volume erro namespaces ");
            } else {
                data = JSON.parse(body);
                console.log(JSON.stringify(data.items));
                console.log("this is volume lis http");

                for (i = 0; i < data.items.lenght; i++) {
                    volumeStatus.push({
                        volumeName: data.items[i].metadata.name,
                        controllerStatus: data.items[i].metadata.annotations['vsm.openebs.io/controller-status'],
                        replicaCount: data.items[i].metadata.annotations['vsm.openebs.io/replica-count'],
                        replicaStatus: data.items[i].metadata.annotations['vsm.openebs.io/replica-status'],
                        capacity: data.items[i].metadata.annotations['vsm.openebs.io/volume-size'],
                    });
                }
                console.log(volumeStatus);
                resolve(volumeStatus);
            }
        });
    });
}



getvolume().then(function (result) {
    console.log(result);
});


router.get('/volume', (req, res) => {
    getvolume().then(function (result) {
        console.log(result);
        res.status(200).json({ volumeStatus });
    });

});
module.exports = router;