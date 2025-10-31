"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import FilterSidebar from "./Filters";
import ProductCard from "./ProductCard";
import axios from "axios";
import "../Css/shop.css";

const API = process.env.NEXT_PUBLIC_BACKEND_LINK;

const ProductList = ({
  initialProducts = [],
  categories = [],
  category,
  subcategory = null, // ✅ default to null for category pages
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [sortOrder, setSortOrder] = useState(null);
  const [values, setValues] = useState([0, 1000]);
  const [globalMin, setGlobalMin] = useState(0);
  const [globalMax, setGlobalMax] = useState(1000);

  // Pagination state
  const [offset, setOffset] = useState(initialProducts.length || 0);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (initialProducts.length) {
      const prices = initialProducts.map((p) =>
        p.prod_offerprice ? parseFloat(p.prod_offerprice) : parseFloat(p.prod_price)
      );
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setGlobalMin(min);
      setGlobalMax(max);
      setValues([min, max]);
    }
  }, [initialProducts]);

  // Sorting & filtering
  const getSortLabel = () => {
    switch (sortOrder) {
      case "lowToHigh":
        return "Price: Low to High";
      case "highToLow":
        return "Price: High to Low";
      case "newest":
        return "Newest";
      default:
        return "Sort by";
    }
  };

  const applyFilters = (customSort = sortOrder) => {
    let list = [...products];

    // Filter by price
    list = list.filter((p) => {
      const price = p.prod_offerprice ? parseFloat(p.prod_offerprice) : parseFloat(p.prod_price);
      return price >= values[0] && price <= values[1];
    });

    // Sorting
    if (customSort === "lowToHigh") {
      list.sort((a, b) => (a.prod_offerprice || a.prod_price) - (b.prod_offerprice || b.prod_price));
    }
    if (customSort === "highToLow") {
      list.sort((a, b) => (b.prod_offerprice || b.prod_price) - (a.prod_offerprice || a.prod_price));
    }
    if (customSort === "newest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(list);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    applyFilters(order);
  };

  // ✅ Load more products
  const loadMoreProducts = async () => {
    try {
      const url = subcategory
        ? `${API}/api/shop/${category}/${subcategory}?limit=${limit}&offset=${offset}`
        : `${API}/api/shop/${category}?limit=${limit}&offset=${offset}`;

      const res = await axios.get(url);
      const newProducts = res.data;

      if (!newProducts.length) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => [...prev, ...newProducts]);
      setOffset((prev) => prev + limit);
    } catch (err) {
      console.error("Error loading more products:", err);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="container my-3 fade-in">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">{category}</li>
            {subcategory && <li className="breadcrumb-item active">{subcategory}</li>}
          </ol>
        </nav>
      </div>

      <div className="container my-4">
        <div className="row">
          {/* LEFT FILTER */}
          <div className="col-lg-3 d-none d-lg-block">
            <FilterSidebar
              globalMin={globalMin}
              globalMax={globalMax}
              values={values}
              setValues={setValues}
              applyFilter={applyFilters}
              allProducts={products}
              categories={categories}
            />
          </div>

          {/* RIGHT PRODUCTS */}
          <div className="col-lg-9">
            {/* Top Controls */}
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <button
                className="btnFilter d-flex align-items-center gap-2 d-lg-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#filterOffcanvas"
              >
                Filters <SlidersHorizontal strokeWidth={1.5} size={18} />
              </button>

              {/* Sort Dropdown */}
              <div className="dropdown ms-auto">
                <button className="btnSortDropdown dropdown-toggle" data-bs-toggle="dropdown">
                  {getSortLabel()}
                </button>
                <ul className="dropdown-menu shadow-sm">
                  <li>
                    <button className="dropdown-item" onClick={() => handleSort("lowToHigh")}>
                      Price: Low to High
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleSort("highToLow")}>
                      Price: High to Low
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleSort("newest")}>
                      Newest
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <ProductCard products={filteredProducts.length ? filteredProducts : products} />

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-4">
                <button className="btn btn-primary px-4" onClick={loadMoreProducts}>
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Offcanvas */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="filterOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Filters</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
        </div>
        <div className="offcanvas-body">
          <FilterSidebar
            globalMin={globalMin}
            globalMax={globalMax}
            values={values}
            setValues={setValues}
            applyFilter={applyFilters}
            allProducts={products}
            categories={categories}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
