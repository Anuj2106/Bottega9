"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const MobileOffcanvasNav = () => {
  const router=useRouter();
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  
   const closeOffcanvas = () => {
    const offcanvas = document.querySelector('#mobileOffcanvasMenu.show');
    if (offcanvas && window.bootstrap) {
      window.bootstrap.Offcanvas.getInstance(offcanvas)?.hide();
    }
  };
   const handleNavLinkClick = (href) => {
    closeOffcanvas();
    router.push(href);
  };

  // Main Links (from your NavbarOrangeTreeStyle)
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/lookbook", label: "Lookbook" },
    { href: "/contact", label: "Contact" },
    { href: "/collection", label: "Collection" },
    { href: "/shop", label: "Shop" },
  ];

  // Example drop down items
  const collectionItems = [
    { href: "/collection/modern", label: "Modern" },
    { href: "/collection/vintage", label: "Vintage" },
    { href: "/collection/minimal", label: "Minimal" },
  ];

  return (
    <section className="mobile-header sticky-top z-3 d-flex d-lg-none">
      <div className="container-fluid bg-light">
        {/* Top bar */}
        <nav className="navbar py-2 px-3 d-flex justify-content-between align-items-center">
          {/* Brand */}
          <Link href="/" className="navbar-brand fw-bold fs-4">
            BOTTEGA<sub>9</sub>
          </Link>

          {/* Hamburger toggler */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileOffcanvasMenu"
            aria-controls="mobileOffcanvasMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>

        {/* Offcanvas Menu */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="mobileOffcanvasMenu"
          aria-labelledby="mobileOffcanvasMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title fw-bold" id="mobileOffcanvasMenuLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            />
          </div>

          <div className="offcanvas-body px-0">
            <ul className="navbar-nav gap-2 px-3">
              {/* Collection dropdown example */}
              <li className="nav-item">
                <button
                  className="nav-link d-flex justify-content-between w-100 align-items-center"
                  onClick={() => setIsCollectionOpen(!isCollectionOpen)}
                  style={{ fontWeight: 500 }}
                >
                  Collection
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      isCollectionOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isCollectionOpen && (
                  <div className="ps-3">
                    {collectionItems.map(({ href, label }) => (
                      <Link
                        key={label}
                        href={href}
                        className="dropdown-item py-2"
                        data-bs-dismiss="offcanvas"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Other nav links */}
              {navLinks
                .filter((link) => link.label !== "Collection") // remove duplicate if dropdown
                .map(({ href, label }) => (
                  <li className="nav-item" key={label}>
              <button
                data-bs-dismiss="offcanvas"
                className="nav-link btn btn-link px-3 py-2 text-start"
                type="button"
                onClick={() => handleNavLinkClick(href)}
              >
                {label}
              </button>
            </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .transition-transform {
          transition: transform 0.3s ease;
        }
        .rotate-180 {
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
};

export default MobileOffcanvasNav;
