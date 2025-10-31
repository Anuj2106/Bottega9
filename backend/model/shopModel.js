const db=require('../config/db')
const Shop = {
  // Products by category
  getByCategory: (categorySlug, limit, offset, callback) => {
    db.query(
      `SELECT 
        p.*, 
        c.cat_name, 
        c.slug AS category_slug,
        b.badge_name,
        GROUP_CONCAT(pi.img_path) AS images
      FROM products p
      JOIN category c ON p.cat_id = c.cat_id
      LEFT JOIN badges b ON p.badge_id = b.badge_id
      LEFT JOIN product_images pi ON p.prod_id = pi.prod_id
      WHERE c.slug = ?
        AND p.prod_status = 1
      GROUP BY p.prod_id
      LIMIT ? OFFSET ?;`,
      [categorySlug, limit, offset],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      }
    );
  },

  // Products by category + subcategory
  getByCategoryAndSubCategory: (categorySlug, subcategorySlug, limit, offset, callback) => {
    db.query(
      `SELECT 
        p.*, 
        c.cat_name, 
        c.slug AS category_slug,
        s.sub_name, 
        s.slug AS subcategory_slug,
        b.badge_name,
        GROUP_CONCAT(pi.img_path) AS images
      FROM products p
      JOIN category c ON p.cat_id = c.cat_id
      JOIN subcategory s ON p.sub_id = s.sub_id
      LEFT JOIN badges b ON p.badge_id = b.badge_id
      LEFT JOIN product_images pi ON p.prod_id = pi.prod_id
      WHERE c.slug = ?
        AND s.slug = ?
        AND p.prod_status = 1
      GROUP BY p.prod_id
      LIMIT ? OFFSET ?;`,
      [categorySlug, subcategorySlug, limit, offset],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      }
    );
  },
  getByCategorySubcategoryAndItem: (categorySlug, subcategorySlug, itemSlug, limit, offset, callback) => {
  db.query(
    `
    SELECT 
      p.*, 
      c.cat_name, 
      c.slug AS category_slug,
      s.sub_name, 
      s.slug AS subcategory_slug,
      i.item_name,
      i.slug AS item_slug,
      b.badge_name,
      GROUP_CONCAT(pi.img_path) AS images
    FROM products p
    JOIN category c ON p.cat_id = c.cat_id
    JOIN subcategory s ON p.sub_id = s.sub_id
    JOIN items i ON p.item_id = i.item_id
    LEFT JOIN badges b ON p.badge_id = b.badge_id
    LEFT JOIN product_images pi ON p.prod_id = pi.prod_id
    WHERE c.slug = ?
      AND s.slug = ?
      AND i.slug = ?
      AND p.prod_status = 1
    GROUP BY p.prod_id
    LIMIT ? OFFSET ?;
    `,
    [categorySlug, subcategorySlug, itemSlug, limit, offset],
    (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    }
  );
},

};

module.exports = Shop;
