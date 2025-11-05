'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Home, Plus, Share2, Download } from 'lucide-react';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

const Order = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders (Admin)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/orders/admin/all`);
        console.log('Orders:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        Swal.fire('Error', 'Failed to fetch orders', 'error');
      }
    };
    fetchOrders();
  }, []);

  // ✅ Handle order status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: `Change order status to "${newStatus}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d4af37',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Yes, update it',
      });

      if (!confirm.isConfirmed) return;

      await axios.put(`${apiUrl}/api/orders/admin/update-status/${orderId}`, {
        status: newStatus,
      });

      Swal.fire('Updated!', `Order status changed to ${newStatus}`, 'success');

      // Update state without refetch
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === orderId ? { ...o, order_status: newStatus } : o
        )
      );
    } catch (error) {
      console.error('Failed to update order status:', error);
      Swal.fire('Error', 'Failed to update order status', 'error');
    }
  };

  // Status options for dropdown
  const statusOptions = [
    { value: 'Pending', label: '🕒 Pending', className: 'bg-warning text-dark' },
    { value: 'Processing', label: '⚙️ Processing', className: 'bg-info text-dark' },
    { value: 'Shipped', label: '📦 Shipped', className: 'bg-primary text-white' },
    { value: 'Delivered', label: '✅ Delivered', className: 'bg-success text-white' },
    { value: 'Cancelled', label: '❌ Cancelled', className: 'bg-danger text-white' },
  ];

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
            <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
              <li className="breadcrumb-item">
                <a href="#"><Home size={16} className="icon icon-xxs" /></a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Orders
              </li>
            </ol>
          </nav>
          <h2 className="h1">Orders</h2>
          <p className="mb-0">Manage all customer orders here.</p>
        </div>

        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-dark">
            <Plus size={16} className="me-2" /> Add
          </button>
          <div className="btn-group ms-2 ms-lg-3">
            <button type="button" className="btn btn-sm btn-success btn-outline-gray-600">
              <Share2 size={14} className="me-1" /> Share
            </button>
            <button type="button" className="btn btn-sm btn-primary btn-outline-gray-600">
              <Download size={14} className="me-1" /> Export
            </button>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            {orders.length === 0 ? (
              <div className="text-center py-4">No orders found</div>
            ) : (
              <table className="table table-centered table-nowrap mb-0 rounded">
                <thead className="thead-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const current = statusOptions.find(
                      (opt) => opt.value === order.order_status
                    ) || statusOptions[0];

                    return (
                      <tr key={order.order_id}>
                        <td>{index + 1}</td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{order.contact}</td>
                        <td>{order.address}</td>
                        <td>₹{order.grand_total?.toLocaleString()}</td>
                        <td>
                          <div className="dropdown d-inline-block position-relative">
                            <button
                              className={`btn btn-sm dropdown-toggle ${current.className}`}
                              onClick={() =>
                                setOpenDropdownId(
                                  openDropdownId === order.order_id
                                    ? null
                                    : order.order_id
                                )
                              }
                            >
                              {current.label}
                            </button>

                            {openDropdownId === order.order_id && (
                              <ul
                                className="dropdown-menu show position-absolute"
                                style={{ zIndex: 1000 }}
                              >
                                {statusOptions.map((opt) => (
                                  <li key={opt.value}>
                                    <button
                                      className={`dropdown-item ${opt.className}`}
                                      onClick={() => {
                                        handleStatusChange(order.order_id, opt.value);
                                        setOpenDropdownId(null);
                                      }}
                                    >
                                      {opt.label}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
