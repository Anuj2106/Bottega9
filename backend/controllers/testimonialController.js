const Testimonial = require('../model/testimonialModel');

// Get all
exports.getTestimonials = (req, res) => {
  Testimonial.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Add new
exports.createTestimonial = (req, res) => {
  const { name, message, rating, status } = req.body;
  console.log("Received data:", req.body);

  const user_image = req.files['image']?.[0]?.filename || null;
  const video_url = req.files['video']?.[0]?.filename || null;

  const data = { name, message, rating, user_image, video_url, status };

  console.log("Processed data:", data);
  Testimonial.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Testimonial created!', result });
  });
};


// Update
exports.updateTestimonial = (req, res) => {
  const id = req.params.id;
  Testimonial.update(id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Testimonial updated' });
  });
};

// Delete
exports.deleteTestimonial = (req, res) => {
  const id = req.params.id;
  Testimonial.remove(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Testimonial deleted' });
  });
};
