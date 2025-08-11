'use client';
import {
  List,
  Search,
  MessageCircle,
  Bell,
  Maximize,
  Minimize,
  UserCircle,
  Star,
  Clock,
  Users,
  FileText,
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">
        {/* Start Navbar Links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button">
              <List size={18} />
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">Home</a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link">Contact</a>
          </li>
        </ul>

        {/* End Navbar Links */}
        <ul className="navbar-nav ms-auto">
          {/* Search */}
          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              <Search size={18} />
            </a>
          </li>

          {/* Messages Dropdown */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
              <MessageCircle size={18} />
              <span className="navbar-badge badge text-bg-danger">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              {[1, 2, 3].map((_, i) => (
                <a href="#" className="dropdown-item" key={i}>
                  <div className="d-flex">
                    <div className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle bg-light" style={{ width: 50, height: 50 }}>
                      <UserCircle size={32} />
                    </div>
                    <div className="flex-grow-1 ps-3">
                      <h3 className="dropdown-item-title">
                        User {i + 1}
                        <span className="float-end fs-7 text-danger">
                          <Star size={12} />
                        </span>
                      </h3>
                      <p className="fs-7">Message preview text...</p>
                      <p className="fs-7 text-secondary d-flex align-items-center">
                        <Clock size={12} className="me-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                </a>
              ))}
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
            </div>
          </li>

          {/* Notifications Dropdown */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
              <Bell size={18} />
              <span className="navbar-badge badge text-bg-warning">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <span className="dropdown-item dropdown-header">15 Notifications</span>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                {/* <Envelope size={16} className="me-2" /> 4 new messages */}
                <span className="float-end text-secondary fs-7">3 mins</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <Users size={16} className="me-2" /> 8 friend requests
                <span className="float-end text-secondary fs-7">12 hours</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <FileText size={16} className="me-2" /> 3 new reports
                <span className="float-end text-secondary fs-7">2 days</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
          </li>

          {/* Fullscreen Toggle */}
          <li className="nav-item">
            <a className="nav-link" href="#" data-lte-toggle="fullscreen">
              <Maximize data-lte-icon="maximize" />
              <Minimize data-lte-icon="minimize" style={{ display: 'none' }} />
            </a>
          </li>

          {/* User Menu */}
          <li className="nav-item dropdown user-menu">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <UserCircle size={28} className="me-1" />
              <span className="d-none d-md-inline">Alexander Pierce</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <li className="user-header text-bg-primary d-flex flex-column align-items-center py-3">
                <UserCircle size={56} className="mb-2" />
                <p className="mb-0">Alexander Pierce - Web Developer</p>
                <small>Member since Nov. 2023</small>
              </li>
              <li className="user-body">
                <div className="row text-center">
                  <div className="col-4"><a href="#">Followers</a></div>
                  <div className="col-4"><a href="#">Sales</a></div>
                  <div className="col-4"><a href="#">Friends</a></div>
                </div>
              </li>
              <li className="user-footer d-flex justify-content-between">
                <a href="#" className="btn btn-default btn-flat">Profile</a>
                <a href="#" className="btn btn-default btn-flat">Sign out</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
