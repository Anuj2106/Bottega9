  "use client";
  import Link from "next/link";
  import { useState,useEffect ,useRef} from "react";
  import { ShoppingCart, User, Heart, LogOut, Search } from "lucide-react";
  import { useAuth } from "@/app/Context/auth/authContext";
  import { useWishlist } from "@/app/Context/wishlist/wishlistContext";
  import { useCart } from "@/app/Context/cart/cartContext";

  const NavbarOrangeTreeStyle = () => {
    const { isAuthenticated, logout } = useAuth();
    const { wishlist } = useWishlist();
    const { cart } = useCart();

    // Dropdown open states (for controlling on click in mobile)
    const [isCollectionOpen, setIsCollectionOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef(null);
      useEffect(() => {
      if (isSearchOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isSearchOpen]);

    // Links for dropdowns
    const collectionItems = [
      { href: "/collection/modern", label: "Modern" },
      { href: "/collection/vintage", label: "Vintage" },
      { href: "/collection/minimal", label: "Minimal" },
    ];
 const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
    setIsSearchOpen(false);
  };
   

    // Main non-dropdown nav links
    const navLinks = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/lookbook", label: "Lookbook" },
      { href: "/contact", label: "Contact" },
      { href: "/collection", label: "Collection" },
      { href: "/shop", label: "Shop" },
    ];

    return (
      <header className="sticky-top bg-white d-none d-lg-block shadow-sm" style={{ zIndex: 1030 }}>
        <nav className="navbar navbar-expand-lg container">
          {/* Brand */}
          <Link href="/" className="navbar-brand fw-bold fs-5 text-dark">
            BOTTEGA<sub>9</sub>
          </Link>

          {/* Navbar toggler for mobile */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#Bottega9"
            aria-controls="Bottega9"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Navbar collapse */}
          <div className="collapse navbar-collapse" id="Bottega9">
            {/* Nav links centered */}
            <ul className="navbar-nav mx-auto align-items-center">
              {/* Home, About, Lookbook, Contact */}
              {navLinks.map(({ href, label }) => (
                <li className="nav-item" key={label}>
                  <Link href={href} className="nav-link text-dark px-3">
                    {label}
                  </Link>
                </li>
              ))}
             
            </ul>

            {/* Right-side icons */}
            <ul className="navbar-nav d-flex align-items-center gap-3">
              {/* Search icon - you can toggle a search input or link here */}
              <li className="nav-item d-none d-lg-flex align-items-center">
        {!isSearchOpen && (
          <button
            className="btn btn-link nav-link text-dark p-0"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search"
          >
            <Search size={18} />
          </button>
        )}
        {isSearchOpen && (
          <form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              // Handle your search submit logic here
              setIsSearchOpen(false);
            }}
          >
            <input
              type="search"
              ref={inputRef}
              className="form-control form-control-sm rounded-pill"
              placeholder="Search products..."
              onBlur={() => setIsSearchOpen(false)} // close when clicking outside
              aria-label="Search products"
            />
          </form>
        )}
      </li>

              {/* Wishlist */}
              <li className="nav-item position-relative">
                <Link
                  href="/wishlist"
                  className="nav-link position-relative text-dark"
                  title="Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart />
                  {wishlist.length > 0 && (
                    <span
                      className="position-absolute  start-75 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </li>

              {/* Cart */}
              <li className="nav-item position-relative">
                <Link
                  href="/cart"
                  className="nav-link position-relative text-dark"
                  title="Cart"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart />
                  {cart.length > 0 && (
                    <span className="position-absolute  start-75 translate-middle rounded-pill badge bg-danger" style={{ fontSize: "0.6rem" }}>
                      {cart.length}
                    </span>
                  )}
                </Link>
              </li>

              {/* User login/logout */}
              <li className="nav-item">
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="btn btn-link nav-link text-dark p-0"
                    aria-label="Logout"
                    style={{ cursor: "pointer" }}
                  >
                    <LogOut />
                  </button>
                ) : (
                  <Link 
                    href="auth/Login"
                    className="nav-link text-dark"
                   
                  >
                    <User />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>

        {/* Optional CSS for hover dropdown on desktop */}
        <style jsx>{`
          @media (min-width: 992px) {
            .navbar-nav .dropdown:hover > .dropdown-menu {
              display: block;
              margin-top: 0;
            }
            .navbar-nav .dropdown-menu {
            transition: opacity 0.3s ease;
            visibility: visible;
            opacity: 1;
          }
        }
      `}</style>
    </header>
  );
};

export default NavbarOrangeTreeStyle;
