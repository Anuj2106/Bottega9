'use client';
import { useState, useEffect } from "react";
import { Range } from 'react-range';
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import Hero from "../Components/Hero";
import ProductCard from "../Components/ProductCard";
import FilterSidebar from "../Components/Filters";
import axios from "axios";
import "../Css/shop.css";
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  const [globalMin, setGlobalMin] = useState(0);
  const [globalMax, setGlobalMax] = useState(1000);
  const [values, setValues] = useState([0, 1000]);
  const [activeCategory, setActiveCategory] = useState(null);

  const getSortLabel = () => {
    switch (sortOrder) {
      case 'lowToHigh': return 'Price: Low to High';
      case 'highToLow': return 'Price: High to Low';
      case 'newest':    return 'Newest';
      default:          return 'Sort by';
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/product/index`, { withCredentials: true });
      const all = data.products;
      setProducts(all);
      setFilteredProducts(all);
      setCategories(data.categories);

      const prices = all.map(p =>
        p.prod_offerprice && !isNaN(p.prod_offerprice)
          ? parseFloat(p.prod_offerprice)
          : parseFloat(p.prod_price)
      );
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setGlobalMin(min);
      setGlobalMax(max);
      setValues([min, max]);
    } catch (e) {
      console.error("Error fetching products:", e);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    applyFilters(sortOrder, [catId]);
  };
  const handleAllProducts = () => {
    setActiveCategory(null);
    applyFilters(sortOrder, []);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    applyFilters(order, activeCategory ? [activeCategory] : []);
  };

  const applyFilters = (
    customSort = sortOrder,
    selCats = [],
    selCols = null,
    selBadges = null
  ) => {
    let list = products.filter(p => {
      // category
      const inCategory = !selCats.length || selCats.includes(p.cat_id);

      // price
      const price = p.prod_offerprice && !isNaN(p.prod_offerprice)
        ? parseFloat(p.prod_offerprice)
        : parseFloat(p.prod_price);
      const inPrice = price >= values[0] && price <= values[1];

      return inCategory && inPrice;
    });

    // color & badge filters from sidebar if provided
    if (selCols?.length) {
      list = list.filter(p =>
        p.prod_color?.split(/[ ,]+/).some(c => selCols.includes(c.trim()))
      );
    }
    if (selBadges?.length) {
      list = list.filter(p => selBadges.includes(p.badge_name));
    }

    // sorting
    if (customSort === 'lowToHigh') {
      list.sort((a, b) =>
        ( (a.prod_offerprice||a.prod_price) - (b.prod_offerprice||b.prod_price) )
      );
    }
    if (customSort === 'highToLow') {
      list.sort((a, b) =>
        ( (b.prod_offerprice||b.prod_price) - (a.prod_offerprice||a.prod_price) )
      );
    }
    if (customSort === 'newest') {
      list.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredProducts(list);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="container my-3 fade-in">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
            <li className="breadcrumb-item active">Products</li>
          </ol>
        </nav>
      </div>

      <Hero Page="allproducts" />

      <div className="container my-4">
        {/* Category Pills */}
        <div className="categoryPillsWrapper mb-4">
          <ul className="nav nav-pills flex-nowrap overflow-auto gold-scrollbar">
            <li className="nav-item" key="all">
              <button
                className={`navPillsLink ${activeCategory === null ? "active" : ""}`}
                onClick={handleAllProducts}
              >All</button>
            </li>
            {categories.map(cat => (
              <li className="nav-item" key={cat.cat_id}>
                <button
                  className={`navPillsLink ${activeCategory === cat.cat_id ? "active" : ""}`}
                  onClick={() => handleCategoryClick(cat.cat_id)}
                >
                  {cat.cat_name}
                </button>
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
              <li>
                <button className="dropdown-item" onClick={() => handleSort('lowToHigh')}>
                  Price: Low to High
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleSort('highToLow')}>
                  Price: High to Low
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleSort('newest')}>
                  Newest
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <ProductCard products={filteredProducts} />
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        globalMin={globalMin}
        globalMax={globalMax}
        values={values}
        setValues={setValues}
        categories={categories}
        applyFilter={applyFilters}
        allProducts={products}
      />
    </>
  );
};

export default CollectionPage;
