'use client';
import { Range } from 'react-range';
import { useState, useEffect } from 'react';
import "../Css/filter.css"

const FilterSidebar = ({
  globalMin, globalMax, values, setValues,
  categories, applyFilter, allProducts
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    category: true,
    productType: true,
    product: false,
    collection: false
  });

  const [availableColors, setAvailableColors] = useState([]);
  const [availableBadges, setAvailableBadges] = useState([]);

  useEffect(() => {
    const colorSet = new Set();
    const badgeSet = new Set();
    allProducts.forEach(prod => {
      if (prod.prod_color) {
        prod.prod_color
          .split(/[ ,]+/)
          .forEach(c => colorSet.add(c.trim()));
      }
      if (prod.badge_name) badgeSet.add(prod.badge_name);
    });
    setAvailableColors([...colorSet]);
    setAvailableBadges([...badgeSet]);
  }, [allProducts]);

  const toggleSelection = (val, list, setList) => {
    setList(list.includes(val)
      ? list.filter(x => x !== val)
      : [...list, val]
    );
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="westelm-filter-sidebar">
      {/* Categories Section */}
      <div className="filter-group">
        <h3 className="filter-group-title">Categories</h3>
        <div className="category-links">
          <div className="category-link">
            <span>Bedding By Material</span>
            <span className="expand-icon">+</span>
          </div>
          <div className="category-link">
            <span>Bed Linen</span>
            <span className="expand-icon">+</span>
          </div>
          <div className="category-link">
            <span>Pillows & Throws</span>
            <span className="expand-icon">+</span>
          </div>
          <div className="category-link">
            <span>Bath Linen & Accessories</span>
            <span className="expand-icon">+</span>
          </div>
          <div className="category-link">
            <span>Bedding Essentials</span>
            <span className="expand-icon">+</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <div 
          className="filter-section-header"
          onClick={() => toggleSection('category')}
        >
          <h3 className="filter-section-title">Category</h3>
          <span className="toggle-icon">{expandedSections.category ? '−' : '+'}</span>
        </div>
        {expandedSections.category && (
          <div className="filter-options">
            <label className="filter-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="option-text">Bedding & Bath</span>
            </label>
          </div>
        )}
      </div>

      {/* Product Type */}
      <div className="filter-group">
        <div 
          className="filter-section-header"
          onClick={() => toggleSection('productType')}
        >
          <h3 className="filter-section-title">Product Type</h3>
          <span className="toggle-icon">{expandedSections.productType ? '−' : '+'}</span>
        </div>
        {expandedSections.productType && (
          <div className="filter-options">
            <label className="filter-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="option-text">Bath Linen & Accessories</span>
            </label>
            <label className="filter-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="option-text">Bed Linen</span>
            </label>
            <label className="filter-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="option-text">Bedding Essentials</span>
            </label>
          </div>
        )}
      </div>

      {/* Dynamic Shop by Room */}
      {categories.length > 0 && (
        <div className="filter-group">
          <div 
            className="filter-section-header"
            onClick={() => toggleSection('categories')}
          >
            <h3 className="filter-section-title">Shop by Room</h3>
            <span className="toggle-icon">{expandedSections.categories ? '−' : '+'}</span>
          </div>
          {expandedSections.categories && (
            <div className="filter-options">
              {categories.map(cat => (
                <label key={cat.cat_id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.cat_id)}
                    onChange={() =>
                      toggleSelection(cat.cat_id, selectedCategories, setSelectedCategories)
                    }
                  />
                  <span className="checkmark"></span>
                  <span className="option-text">{cat.cat_name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Product */}
      <div className="filter-group">
        <div 
          className="filter-section-header"
          onClick={() => toggleSection('product')}
        >
          <h3 className="filter-section-title">Product</h3>
          <span className="toggle-icon">{expandedSections.product ? '−' : '+'}</span>
        </div>
        {expandedSections.product && (
          <div className="filter-options">
            {availableBadges.map((badge, idx) => (
              <label key={idx} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedBadges.includes(badge)}
                  onChange={() =>
                    toggleSelection(badge, selectedBadges, setSelectedBadges)
                  }
                />
                <span className="checkmark"></span>
                <span className="option-text">{badge}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Collection */}
      <div className="filter-group">
        <div 
          className="filter-section-header"
          onClick={() => toggleSection('collection')}
        >
          <h3 className="filter-section-title">Collection</h3>
          <span className="toggle-icon">{expandedSections.collection ? '−' : '+'}</span>
        </div>
        {expandedSections.collection && (
          <div className="filter-options">
            {availableColors.map((color, idx) => (
              <label key={idx} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() =>
                    toggleSelection(color, selectedColors, setSelectedColors)
                  }
                />
                <span className="checkmark"></span>
                <span className="option-text">{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range - Always Visible */}
      <div className="filter-group">
        <h3 className="filter-section-title">Price Range</h3>
        <div className="price-range-container">
         <Range
  step={1}
  min={globalMin}
  max={globalMax}
  values={values}
  onChange={setValues}
  renderTrack={({ props, children }) => (
    <div {...props} className="price-track">
      {children}
    </div>
  )}
  renderThumb={({ props }) => {
    const { key, ...rest } = props; // remove key
    return <div key={key} {...rest} className="price-thumb" />;
  }}
/>

          <div className="price-display">
            <span>₹{values[0]} – ₹{values[1]}</span>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <button
        className="apply-filters-btn"
        onClick={() =>
          applyFilter(null, selectedCategories, selectedColors, selectedBadges)
        }
      >
        Apply Filters
      </button>

      <style jsx>{`
        /* Styles omitted for brevity – see code_file:26 */
      `}</style>
    </aside>
  );
};

export default FilterSidebar;
