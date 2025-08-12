'use client';
import { Range } from 'react-range';
import { useState, useEffect } from 'react';

const FilterSidebar = ({
  globalMin, globalMax, values, setValues,
  categories, applyFilter, allProducts
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);

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

  return (
    <div className="offcanvas offcanvas-start" id="filterOffcanvas" tabIndex={-1}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Filters</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
      </div>
      <div className="offcanvas-body">

        {/* Categories */}
        {categories.length > 0 && (
          <div className="category-filters">
            <h6 className="filter-section-title">Categories</h6>
            {categories.map(cat => (
              <div className="filter-checkbox" key={cat.cat_id}>
                <input
                  type="checkbox"
                  id={`cat-${cat.cat_id}`}
                  checked={selectedCategories.includes(cat.cat_id)}
                  onChange={() =>
                    toggleSelection(cat.cat_id, selectedCategories, setSelectedCategories)
                  }
                />
                <label htmlFor={`cat-${cat.cat_id}`}>
                  {cat.cat_name}
                </label>
              </div>
            ))}
          </div>
        )}

        {/* Price Range */}
        <div className="price-range-section">
          <h6 className="filter-section-title">Price Range</h6>
          <Range
            step={1}
            min={globalMin}
            max={globalMax}
            values={values}
            onChange={setValues}
            renderTrack={({ props, children }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={key}
                  {...rest}
                  style={{
                    ...rest.style,
                    height: '6px',
                    background: 'var(--gold, #d4af37)',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {children}
                </div>
              );
            }}
            renderThumb={({ props }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={key}
                  {...rest}
                  style={{
                    height: '20px',
                    width: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    border: '3px solid var(--gold, #d4af37)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
              );
            }}
          />
          <div className="price-display">
            ₹{values[0]} – ₹{values[1]}
            <br />
            <small>Min: ₹{globalMin} • Max: ₹{globalMax}</small>
          </div>
        </div>

        {/* Colors */}
        {availableColors.length > 0 && (
          <div className="color-filters">
            <h6 className="filter-section-title">Colors</h6>
            {availableColors.map((color, idx) => (
              <div className="color-option" key={idx}>
                <input
                  type="checkbox"
                  id={`color-${idx}`}
                  checked={selectedColors.includes(color)}
                  onChange={() =>
                    toggleSelection(color, selectedColors, setSelectedColors)
                  }
                />
                <div
                  className="color-preview"
                  style={{ backgroundColor: color }}
                />
                <label htmlFor={`color-${idx}`} className="color-name">
                  {color}
                </label>
              </div>
            ))}
          </div>
        )}

        {/* Badges */}
        {availableBadges.length > 0 && (
          <div className="badge-filters">
            <h6 className="filter-section-title">Product Badges</h6>
            {availableBadges.map((badge, idx) => (
              <div className="badge-option" key={idx}>
                <input
                  type="checkbox"
                  id={`badge-${idx}`}
                  checked={selectedBadges.includes(badge)}
                  onChange={() =>
                    toggleSelection(badge, selectedBadges, setSelectedBadges)
                  }
                />
                <label htmlFor={`badge-${idx}`} className="badge-text">
                  {badge}
                </label>
              </div>
            ))}
          </div>
        )}

        {/* Apply Filters */}
        <div className="mt-4">
          <button
            className="apply-filter-btn w-100"
            data-bs-dismiss="offcanvas"
            onClick={() =>
              applyFilter(
                /* sort */ null,
                /* categories */ selectedCategories,
                /* colors */ selectedColors,
                /* badges */ selectedBadges
              )
            }
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
