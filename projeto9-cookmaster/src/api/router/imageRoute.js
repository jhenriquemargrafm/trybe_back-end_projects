const express = require('express');

const router = express.Router();
const path = require('path');

router.get('/:endImage', async (req, res) => {
  const { endImage } = req.params;
  res.sendFile(path.resolve(`${__dirname}/../../uploads/${endImage}`));
});

module.exports = router;