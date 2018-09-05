
const express = require('express');
const router = express();

router.get('/yaml', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "percona",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/ab789cad2c16d2c7a109567bba95d1f8f4bf25b9/production/percona-jiva/mongo-jiva-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/7c67f70c877493f39c634ffce6305ee34e74d9ea/production/percona-jiva/percona-openebs-deployment.yaml"
 });
});



module.exports = router;