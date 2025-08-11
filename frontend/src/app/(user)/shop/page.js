'use client';
import { useState, useEffect } from "react";
import { Range } from 'react-range';
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import Hero from "../Components/Hero";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import "../Css/shop.css"; // new luxury styles here
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

const ProductList = () => {
  const [Product, SetProduct] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const [globalMin, setGlobalMin] = useState(0);
  const [globalMax, setGlobalMax] = useState(1000);
  const [values, setValues] = useState([0, 1000]);

  const getSortLabel = () => {
    switch (sortOrder) {
      case 'lowToHigh': return 'Price: Low to High';
      case 'highToLow': return 'Price: High to Low';
      case 'newest': return 'Newest';
      default: return 'Sort by';
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/product/index`, { withCredentials: true });

      const data = response.data;
      const allProducts = data.products;

      SetProduct(allProducts);
      setFilteredProducts(allProducts);
      setCategories(data.categories);

      const prices = allProducts.map((p) =>
        p.prod_offerprice && !isNaN(p.prod_offerprice)
          ? parseFloat(p.prod_offerprice)
          : parseFloat(p.prod_price)
      );
      const min = prices.length ? Math.min(...prices) : 0;
      const max = prices.length ? Math.max(...prices) : 1000;

      setGlobalMin(min);
      setGlobalMax(max);
      setValues([min, max]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleCategoryClick = (catId) => setActiveCategory(catId);
  const handleAllProducts = () => { setFilteredProducts(Product); setActiveCategory(null); };

  const handleSort = (order) => { setSortOrder(order); handleApplyFilter(order); };

  const handleApplyFilter = (customSortOrder = sortOrder) => {
    let filtered = Product.filter((prod) => {
      const price = prod.prod_offerprice && !isNaN(prod.prod_offerprice)
        ? parseFloat(prod.prod_offerprice)
        : parseFloat(prod.prod_price);

      const matchesCategory = activeCategory === null || prod.cat_id === activeCategory;
      const matchesPrice = price >= values[0] && price <= values[1];
      return matchesCategory && matchesPrice;
    });

    if (customSortOrder === 'lowToHigh') {
      filtered.sort((a, b) => (
        (a.prod_offerprice || a.prod_price) - (b.prod_offerprice || b.prod_price)
      ));
    }
    if (customSortOrder === 'highToLow') {
      filtered.sort((a, b) => (
        (b.prod_offerprice || b.prod_price) - (a.prod_offerprice || a.prod_price)
      ));
    }
    if (customSortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="container my-3 fade-in">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Products</li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <Hero Page="allproducts" />

      <div className="container my-4">
        {/* Category Pills */}
        <div className="categoryPillsWrapper mb-4">
          <ul className="nav nav-pills flex-nowrap overflow-auto gold-scrollbar">
            <li className="nav-item" key="all">
              <button
                className={`navPillsLink ${activeCategory === null ? "active" : ""}`}
                onClick={() => { handleAllProducts(); }}
              >All</button>
            </li>
            {Categories.map((cat) => (
              <li className="nav-item" key={cat.cat_id}>
                <button
                  className={`navPillsLink ${activeCategory === cat.cat_id ? "active" : ""}`}
                  onClick={() => { handleCategoryClick(cat.cat_id); handleApplyFilter(); }}
                >{cat.cat_name}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <button
            className="btnFilter d-flex align-items-center gap-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterOffcanvas"
          >
            Filters <SlidersHorizontal strokeWidth={1.5} size={18} />
          </button>

          <div className="dropdown">
            <button className="btnSortDropdown dropdown-toggle" data-bs-toggle="dropdown">
              {getSortLabel()}
            </button>
            <ul className="dropdown-menu shadow-sm">
              <li><button className="dropdown-item" onClick={() => handleSort('lowToHigh')}>Price: Low to High</button></li>
              <li><button className="dropdown-item" onClick={() => handleSort('highToLow')}>Price: High to Low</button></li>
              <li><button className="dropdown-item" onClick={() => handleSort('newest')}>Newest</button></li>
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <ProductCard products={filteredProducts} />

        {/* Offcanvas Filter Menu */}
        <div className="offcanvas offcanvas-start" id="filterOffcanvas">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Filters</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
          </div>
          <div className="offcanvas-body">
            <h6 className="mb-3">Price Range</h6>
            <div className="mb-3">
             <Range
  step={1}
  min={globalMin}
  max={globalMax}
  values={values}
  onChange={(vals) => setValues(vals)}

  renderTrack={({ props, children }) => {
    const { key, ...rest } = props; // remove key from spread
    return (
      <div
        key={key}
        {...rest}
        style={{
          ...rest.style,
          height: '5px',
          background: 'var(--gold)',
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
    const { key, ...rest } = props; // remove key from spread
    return (
      <div
        key={key}
        {...rest}
        style={{
          height: '18px',
          width: '18px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '2px solid var(--gold)'
        }}
      />
    );
  }}
/>

              <small className="text-muted d-block mt-2">₹{values[0]} – ₹{values[1]} (Min: ₹{globalMin} Max: ₹{globalMax})</small>
            </div>

            <div className="applyFilterSticky">
              <button className="btn btn-gold w-100" data-bs-dismiss="offcanvas" onClick={handleApplyFilter}>
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
