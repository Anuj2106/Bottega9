const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadBanner');
const bannerController = require('../controllers/bannerController');


router.get('/index/:page',bannerController.index);
router.post('/add', upload.fields([
  { name: 'banner_img', maxCount: 1 },
  { name: 'banner_video', maxCount: 1 }
]), bannerController.createBanner);
router.get('/allbanners', bannerController.getBanners);
router.put('/status/:id', bannerController.statusToggle);
router.delete('/delete/:id', bannerController.deleteBanner);

module.exports = router;
