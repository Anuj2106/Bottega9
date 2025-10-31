"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, ShoppingBag, User, Heart, LogOut ,MapPin,PenTool} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/auth/authContext";
import { useWishlist } from "@/app/Context/wishlist/wishlistContext";
import { useCart } from "@/app/Context/cart/cartContext";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_BACKEND_LINK;

const staticLinks = [
  { label: "About", href: "/about" },
  { label: "LookBook", href: "/lookbook" },
  { label: "Our Story", href: "/ourstory" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const inputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [openMenu, setOpenMenu] = useState({});
  const [loading, setLoading] = useState(true);

  const [activeCat, setActiveCat] = useState(null);
  const [menuPos, setMenuPos] = useState({ left: 0, top: 0 });
  const menuTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/api/categories`);
        setCategories(res.data || []);
        const initial = {};
        (res.data || []).forEach((c) => (initial[c.label] = false));
        setOpenMenu(initial);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();

    return () => {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  const toggleMenu = (key) => {
    setOpenMenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();
    if (query) {
      const slug = query.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      router.push(`/search/${slug}`);
    }
  };

  const handleCategoryMouseEnter = (e, cat) => {
    if (!cat.subcategories?.length) return;
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);

    const rect = e.currentTarget.getBoundingClientRect();
    const menuW = 750;
    let left = rect.left;
    if (left + menuW > window.innerWidth) left = window.innerWidth - menuW - 12;
    left = Math.max(8, left);
    const top = rect.bottom;

    setMenuPos({ left, top });
    setActiveCat(cat);
  };

  const handleCategoryMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveCat(null), 120);
  };

  const handleFloatingMouseEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
  };
  const handleFloatingMouseLeave = () => setActiveCat(null);

  if (loading) return null;

  return (
    <>
      {/* ============== MOBILE NAV ============== */}
   <section className="mobile-header sticky-top z-3 d-flex d-lg-none">
  <div className="container bg-white border-bottom">
    <nav className="navbar py-2 px-3 position-relative d-flex flex-column align-items-stretch">
      <div className="d-flex justify-content-between align-items-center w-100">
        <button
          className="btn btn-link p-0 border-0"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileOffcanvasMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link
          href="/"
          className="navbar-brand fw-bolder tracking-wide fs-4 mb-0 position-absolute start-50 translate-middle-x text-uppercase"
        >
          BOTTEGA9
        </Link>

        <div style={{ width: "24px" }} />
      </div>

      <div className="d-flex align-items-center mt-2">
        <Search size={20} className="me-2 text-muted" />
        <input
          type="search"
          ref={inputRef}
          className="form-control form-control-sm rounded-pill"
          placeholder="Search products..."
          aria-label="Search products"
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
        />
      </div>
    </nav>

    {/* Offcanvas Menu */}
    <div
      className="offcanvas offcanvas-start"
      id="mobileOffcanvasMenu"
      tabIndex="-1"
      style={{ width: "300px" }}
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title fw-bold text-uppercase">Menu</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
      </div>
      <div className="offcanvas-body px-0">
        <ul className="navbar-nav">
          {categories.map((cat) => (
            <li className="nav-item border-bottom" key={cat.key || cat.label}>
              {/* Category Button */}
              <button
                className="nav-link d-flex justify-content-between align-items-center px-3 py-3 border-0 bg-transparent text-uppercase w-100"
                onClick={() => toggleMenu(cat.label)}
              >
                <span>{cat.label}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${openMenu[cat.label] ? "rotate-180" : ""}`}
                />
              </button>

              {/* Subcategories */}
              {openMenu[cat.label] && cat.subcategories?.length > 0 && (
                <ul className="list-unstyled ps-3">
                  {cat.subcategories.map((sub) => (
                    <li key={sub.slug}>
                      {/* Subcategory Button */}
                      <button
                        className="nav-link d-flex justify-content-between align-items-center px-3 py-2 border-0 bg-transparent text-uppercase w-100 small fw-semibold"
                        onClick={() => toggleMenu(sub.slug)}
                      >
                        <span>{sub.label}</span>
                        {sub.items?.length > 0 && (
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${openMenu[sub.slug] ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>

                      {/* Items */}
                      {openMenu[sub.slug] && sub.items?.length > 0 && (
                        <ul className="list-unstyled ps-3">
                          {sub.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                href={`/shop/${cat.slug}/${sub.slug}/${item.slug}`}
                                className="nav-link px-3 py-1 text-muted small text-capitalize"
                              >
                                <span>

                                {item.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {staticLinks.map((link) => (
            <li className="nav-item border-bottom" key={link.href}>
              <Link href={link.href} className="nav-link px-3 py-3 text-uppercase">
                <span>{link.label}</span>
              </Link>
            </li>
          ))}

          <li className="nav-item border-bottom">
            <button
              className="nav-link px-3 py-3 text-danger border-0 bg-transparent text-uppercase"
              onClick={() => router.push("/sale")}
            >
              <span>SALE</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>


      {/* ============== DESKTOP NAV ============== */}
      <header className="desktop-header d-none sticky-top d-lg-flex flex-column w-100 border-bottom bg-white">
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center py-1 px-5" style={{ fontSize: "12px" }}>
          <span className="text-uppercase">Free shipping on orders over ₹2500</span>
          <div className="d-flex gap-4 align-items-center">
      <Link
        href="https://maps.app.goo.gl/WB5s1JARgqqoPveb9" 
        target="_blank"
  rel="noopener noreferrer"
        className="text-decoration-none text-muted text-uppercase d-flex align-items-center gap-1"
      >
        <MapPin size={15} className="text-grey" />
        <span>Find A Store</span>
      </Link>

      <Link
        href="/design-services"
        className="text-decoration-none text-muted text-uppercase d-flex align-items-center gap-1"
      >
        <PenTool size={15} className="text-grey" />
        <span>Design Services</span>
      </Link>
    </div>
        </div>

        {/* Middle Bar */}
        <div className="d-flex justify-content-between align-items-center px-5 py-3">
          <div className="d-flex align-items-center" style={{ width: "250px" }}>
            <Search size={18} className="me-2 text-muted" />
            <input
              type="search"
              placeholder="Search"
              ref={inputRef}
              className="form-control border-0 border-bottom rounded-0 shadow-none p-0"
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
            />
          </div>

          <Link href="/" className="navbar-brand tracking-wide fs-4 fw-bolder mb-0 text-uppercase">
            Bottega9
          </Link>

          <div className="d-flex align-items-center gap-4 position-relative">
            <Link className="btn btn-link text-dark p-0" href={isAuthenticated ? "#" : "/auth/Login"}>
              <User size={25} />
            </Link>

            <Link className="btn btn-link text-dark p-0 position-relative" href="/wishlist">
              <Heart size={25} />
              {wishlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link className="btn btn-link text-dark p-0 position-relative" href="/cart">
              <ShoppingBag size={25} />
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </Link>

            {isAuthenticated && (
              <button onClick={logout} className="btn btn-link text-dark p-0">
                <LogOut size={25} />
              </button>
            )}
          </div>
        </div>

        {/* Category Bar */}
        <nav className="category-bar d-flex justify-content-center mx-auto border-top">
          <div className="category-scroll-wrapper w-100">
            <ul className="nav categories-list d-flex w-100 flex-nowrap">
              {staticLinks.map((link) => (
                <li className="nav-item px-3" key={link.href}>
                  <Link href={link.href} className="nav-link text-uppercase">
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}

              {categories.map((cat) => (
                <li
                  className="nav-item dropdown px-3"
                  key={cat.key || cat.label}
                  onMouseEnter={(e) => handleCategoryMouseEnter(e, cat)}
                  onMouseLeave={handleCategoryMouseLeave}
                >
                  <Link href={`/shop/${cat.slug}`} className="nav-link text-uppercase">
                    <span>{cat.label}</span>
                  </Link>
                </li>
              ))}

              <li className="nav-item px-3">
                <button className="nav-link text-danger fw-bold border-0 bg-transparent text-uppercase" onClick={() => router.push("/sale")}>
                  <span>SALE</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Floating Dropdown */}
      {activeCat && activeCat.subcategories?.length > 0 && (
        <div
          className="floating-dropdown"
          style={{
            position: "fixed",
            left: `${menuPos.left}px`,
            top: `${menuPos.top}px`,
            zIndex: 3000,
          }}
          onMouseEnter={handleFloatingMouseEnter}
          onMouseLeave={handleFloatingMouseLeave}
        >
          <div className="card p-4 border-0 shadow-sm w-100 " style={{ minWidth: "700px" }}>
            <div className="row row-cols-2 row-cols-md-3 g-3">
              {activeCat.subcategories.map((sub) => (
                <div key={sub.slug} className="col">
                  <Link
                    href={`/shop/${activeCat.slug}/${sub.slug}`}
                    className="fw-bold text-capitalize text-decoration-none mb-2 d-block"
                  >
                    <span className="text-dark">{sub.label}</span>
                  </Link>
                  {sub.items?.length > 0 && (
                    <ul className="list-unstyled ps-2">
                      {sub.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={`/shop/${activeCat.slug}/${sub.slug}/${item.slug}`}
                            className="text-decoration-none text-muted small text-capitalize d-block py-1"
                          >
                            <span className="text-muted">{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
