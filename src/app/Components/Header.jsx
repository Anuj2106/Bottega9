"use client";
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ShoppingCart ,User ,Search} from 'lucide-react';
import "../Css/header.module.css"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  
  return (
    <>
   
    {/* Desktop  header for devices greater than 768px  */}
<section className='desktop-header container bg-light  sticky-top z-3 d-lg-block d-md-none d-sm-none d-none'>

  <nav className="navbar navbar-expand-lg bg-transparent rounded-pill  py-2 ">
    <div className="container d-flex justify-content-between align-items-center">
      {/* Brand on the left */}
      <a className="navbar-brand fw-bold fs-4 links " href="#">BOTTEGA<sub>9</sub></a>

      {/* Center replaced with search bar */}
  <form className="d-none d-lg-flex mx-auto w-50 position-relative">
  <input
    type="text"
    className="form-control rounded-pill pe-5"
    placeholder="Search products..."
  />
  <Search
    size={18}
    className="position-absolute top-50 end-0  translate-middle-y me-3 text-secondary"
  />
</form>


      {/* Right login and cart */}
      <div className="d-flex align-items-center gap-3">
        <a href="#" className="btn  btn-dark text-decoration-none">
          <User />
          Log In
        </a>
        <a href="#" className="btn btn-dark">
          <ShoppingCart  />
          <sup>
            <span className="badge rounded-circle">3</span>
          </sup>
        </a>
      </div>
    </div>
  </nav>

  {/* Second horizontal menu */}
  <div className="bg-transparent  py-2">
    <div className="container d-flex flex-wrap justify-content-center gap-3">
      <a href="#" className="text-dark text-decoration-none links px-3 py-1">All Products</a>
      <a href="#" className="text-dark text-decoration-none links px-3 py-1">New Arrivals</a>
      <a href="#" className="text-dark text-decoration-none links px-3 py-1">Sofas</a>
      <a href="#" className="text-dark text-decoration-none links px-3 py-1">Consoles</a>
      <a href="#" className="text-dark text-decoration-none links px-3 py-1">Dinings</a>
      <a href="#" className="text-dark text-decoration-none links px-3 py-1">Coffee Tables</a>
      <a href="#" className="text-dark text-decoration-none links px-3 py-1">Bed</a>
      <a href="#" className="text-dark text-decoration-none links px-3 py-1">Lounge</a>
    </div>
  </div>

</section>

{/* section end here  */}
{/*   for mobile views  */}
<section className="mobile-header sticky-top z-3 d-block d-md-block d-lg-none">
  <div className="container bg-light">
    <nav className="navbar navbar-expand-lg bg-transparent py-2">
      <div className="container">
        {/* Brand */}
        <a className="navbar-brand fw-bold fs-4 links" href="#">BOTTEGA<sub>9</sub></a>

        {/* Toggler for Offcanvas */}
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Side Icons */}
       
      </div>
    </nav>

    {/* Offcanvas Menu */}
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title fw-bold" id="mobileMenuLabel">Menu</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav gap-2">

          {/* Product Dropdown */}
      
<li className="nav-item">
  <a
    className="nav-link d-flex justify-content-left align-items-center "
    data-bs-toggle="collapse"
    href="#productAccordionMenu"
    role="button"
    aria-expanded={isOpen}
    onClick={() => setIsOpen(!isOpen)}
    style={{ fontWeight: '500' }}
  >
    Products
    <ChevronDown
      size={18}
      className={`transition ${isOpen ? 'rotate-180' : ''}`}
    />
  </a>

  <div className="collapse " id="productAccordionMenu">
    <div className="bg-none rounded mt-1 px-3 py-2">
      <a className="dropdown-item py-2" href="#">All Products</a>
      <a className="dropdown-item py-2" href="#">New Arrivals</a>
      <a className="dropdown-item py-2" href="#">Sofas</a>
      <a className="dropdown-item py-2" href="#">Consoles</a>
      <a className="dropdown-item py-2" href="#">Dinings</a>
      <a className="dropdown-item py-2" href="#">Coffee Tables</a>
      <a className="dropdown-item py-2" href="#">Bed</a>
      <a className="dropdown-item py-2" href="#">Lounge</a>
    </div>
  </div>
</li>



          <li className="nav-item"><a className="nav-link" href="#">Collections</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Services</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Our Story</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Lookbook</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>


    </>
  )
}

export default Header