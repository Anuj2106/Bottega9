const Banner = require('../model/bannerModel');
const Categories=require("../model/categoryModel");
const fs = require('fs');
const path = require('path');

// Get all banners
exports.index = (req, res) => {
  const page = req.params.page;


  Banner.index(page, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json(results);
  });
};
exports.getBanners = (req, res) => {
  Banner.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    Categories.getAllCategories 
    res.json(results);
  });
};

// Create new banner (image or video)
exports.createBanner = (req, res) => {
  const { banner_title ,banner_page,banner_subhead } = req.body;
  const banner_img = req.files?.banner_img?.[0]?.filename || null;
  const banner_video = req.files?.banner_video?.[0]?.filename || null;

 

  if (!banner_img && !banner_video) {
    return res.status(400).json({ error: 'At least an image or a video is required.' });
  }

  const newBanner = {
    banner_title,
    banner_subhead,
    banner_img,
    banner_video,
    banner_page,
    banner_status: 1,
  };

  Banner.create(newBanner, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Banner added', banner_id: result.insertId });
  });
};

// Delete banner
exports.deleteBanner = (req, res) => {
  const id = req.params.id;

  Banner.getById(id, (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Banner not found' });

    const banner = results[0];
    const imagePath = banner.banner_img ? path.join(__dirname, '../public/uploads/banner_media/', banner.banner_img) : null;
    const videoPath = banner.banner_video ? path.join(__dirname, '../public/uploads/banner_media/', banner.banner_video) : null;

    Banner.remove(id, (err) => {
      if (err) return res.status(500).json({ error: err });

      if (imagePath && fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      if (videoPath && fs.existsSync(videoPath)) fs.unlinkSync(videoPath);

      res.json({ message: 'Banner deleted' });
    });
  });
};

// Update banner
exports.updateBanner = (req, res) => {
  const id = req.params.id;
  const { banner_title, banner_status } = req.body;
  const newImage = req.files?.banner_img?.[0]?.filename || null;
  const newVideo = req.files?.banner_video?.[0]?.filename || null;

  Banner.getById(id, (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Banner not found' });

    const old = results[0];

    const updatedData = {
      banner_title,
      banner_img: newImage || old.banner_img,
      banner_video: newVideo || old.banner_video,
      banner_status,
    };

    Banner.update(id, updatedData, (err) => {
      if (err) return res.status(500).json({ error: err });

      if (newImage && old.banner_img) {
        const oldImgPath = path.join(__dirname, '../public/uploads/banner_images/', old.banner_img);
        if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);
      }

      if (newVideo && old.banner_video) {
        const oldVideoPath = path.join(__dirname, '../public/uploads/banner_videos/', old.banner_video);
        if (fs.existsSync(oldVideoPath)) fs.unlinkSync(oldVideoPath);
      }

      res.json({ message: 'Banner updated' });
    });
  });
};
exports.statusToggle = (req, res) => {

   const { id } = req.params;
  const { status } = req.body;

  Banner.statusToggle(status, id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', err });
    res.json({ message: 'Status updated successfully' });
  });
};
