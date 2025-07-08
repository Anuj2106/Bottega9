import Link from "next/link";

const Topnavbar = () => {
  return (
     <nav className="navbar bg-dark top-navbar container navbar-dark d-none d-sm-block">
      <div className="container d-flex justify-content-center">
        <div className="navbar-nav d-flex flex-row gap-4 text-center">
          <Link className="nav-link py-0 text-light" href="#">Collections</Link>
          <Link className="nav-link py-0 text-light" href="#">Services</Link>
          <Link className="nav-link py-0 text-light" href="#">Our Story</Link>
          <Link className="nav-link py-0 text-light" href="#">Lookbook</Link>
          <Link className="nav-link py-0 text-light" href="#">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Topnavbar;
