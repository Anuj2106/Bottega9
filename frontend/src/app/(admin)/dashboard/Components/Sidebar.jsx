'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  LayoutDashboard,
  Users,
  Box,
  Image as ImageIcon,
  List,
  ShoppingCart,
  Package,
  Home,
  MessageCircle,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout', {}, { withCredentials: true });
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
      {/* Brand */}
      <div className="sidebar-brand">
        <Link href="/dashboard" className="brand-link">
          <img src="/logo.png" alt="Logo" className="brand-image opacity-75 shadow" />
          <span className="brand-text fw-light">Bottega</span>
        </Link>
      </div>

      {/* Menu */}
      <div className="sidebar-wrapper">
        <nav className="mt-2">
          <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="navigation" data-accordion="false">

            {/* Dashboard */}
            <li className="nav-item">
              <Link href="/dashboard" className="nav-link">
                <LayoutDashboard className="nav-icon me-2" size={16} />
                <p>Dashboard</p>
              </Link>
            </li>

            {/* Users */}
            <li className="nav-item">
              <Link href="/dashboard/users" className="nav-link">
                <Users className="nav-icon me-2" size={16} />
                <p>Users</p>
              </Link>
            </li>

            {/* Products */}
           <li className="nav-item has-treeview menu-open">
  <a href="#" className="nav-link active">
    <Box className="nav-icon me-2" size={16} />
    <p>
      Products
    <ChevronRight className="nav-arrow" />
    </p>
  </a>
  <ul className="nav nav-treeview">
    <li className="nav-item">
      <Link href="/dashboard/products" className="nav-link">
        <Box size={16} className="nav-icon me-2" />
        <p>All Products</p>
      </Link>
    </li>
    <li className="nav-item">
      <Link href="/dashboard/product-images" className="nav-link">
        <ImageIcon size={16} className="nav-icon me-2" />
        <p>Products Images</p>
      </Link>
    </li>
    <li className="nav-item">
      <Link href="/dashboard/category" className="nav-link">
        <List size={16} className="nav-icon me-2" />
        <p>Category</p>
      </Link>
    </li>
  </ul>
</li>


            {/* Orders */}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <ShoppingCart className="nav-icon me-2" size={16} />
                <p>
                  Orders
                  <ChevronRight className="nav-arrow" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link href="/dashboard/order" className="nav-link">
                    <ShoppingCart className="nav-icon me-2" size={16} />
                    <p>All Orders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dashboard/order-items" className="nav-link">
                    <Package className="nav-icon me-2" size={16} />
                    <p>Order Items</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Content */}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <LayoutDashboard className="nav-icon me-2" size={16} />
                <p>
                  Content
                   <ChevronRight className="nav-arrow" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link href="/dashboard/banners" className="nav-link">
                    <ImageIcon className="nav-icon me-2" size={16} />
                    <p>Banners</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dashboard/lookbook" className="nav-link">
                    <Home className="nav-icon me-2" size={16} />
                    <p>Lookbook</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dashboard/testimonials" className="nav-link">
                    <MessageCircle className="nav-icon me-2" size={16} />
                    <p>Testimonials</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Settings */}
            <li className="nav-item">
              <Link href="/dashboard/settings" className="nav-link">
                <Settings className="nav-icon me-2" size={16} />
                <p>Settings</p>
              </Link>
            </li>

            {/* Logout */}
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link bg-transparent border-0 w-100 text-start">
                <LogOut className="nav-icon me-2" size={16} />
                <p>Logout</p>
              </button>
            </li>

          </ul>
        </nav>
      </div>
    </aside>
  );
}
