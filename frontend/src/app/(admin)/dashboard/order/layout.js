'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Home, Plus, Share2, Download ,Edit, Trash2 } from 'lucide-react';

const Order = () => {
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/orders', {
                    withCredentials: true, // Include cookies for session management
                });
                console.log('Orders:', response.data);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        fetchOrders();
    }, []);
    const handleStatusChange = async (orderId, newStatus) => {
  try {
    const res = await axios.put(`http://localhost:3001/api/orders/${orderId}/status`, {
      order_status: newStatus,
    });

    // Optional: Refresh or update local state
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === orderId
          ? { ...order, order_status: newStatus }
          : order
      )
    );
  } catch (error) {
    console.error("Failed to update order status:", error);
    alert("Failed to update order status");
  }
};


  return (
   <>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="d-block mb-4 mb-md-0">
                <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
                    <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
            <li className="breadcrumb-item">
              <a href="#">
                <Home size={16} className="icon icon-xxs" />
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Volt</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Orders
            </li>
          </ol>
        </nav>
        <h2 className="h1"> Orders</h2>
        <p className="mb-0">Your web analytics dashboard template.</p>
      </div>

      <div className="btn-toolbar mb-2 mb-md-0">
        <button  type="button"
  className="btn btn-dark"
  data-bs-toggle="modal"
  data-bs-target="#addProductModal">
          <Plus size={16} className="me-2" />
          Add 
        </button>
        <div className="btn-group ms-2 ms-lg-3">
          <button type="button" className="btn btn-sm btn-success btn-outline-gray-600">
            <Share2 size={14} className="me-1" />
            Share
          </button>
          <button type="button" className="btn btn-sm btn-primary btn-outline-gray-600">
            <Download size={14} className="me-1" />
            Export
          </button>
        </div>
      </div>
    </div>
    <div className="card border-0 shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-centered table-nowrap mb-0 rounded" role='table'>
                            <thead className="thead-light">
                                <tr>
                                    <th scope='col' className="border-0 rounded-start">#</th>
                                    <th scope='col' className="border-0">Name</th>
                                    <th scope='col' className="border-0 rounded-end">Phone No </th>
                                    <th scope='col' className="border-0 rounded-end">Address </th>
                                    <th scope='col' className="border-0 rounded-end">Total Amount </th>
                                    <th scope='col' className="border-0 rounded-end">Order Status </th> 
                                    {/* <th className="border-0 rounded-end">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
      {orders.map((order, index) => {
  
const currentStatus = order.order_status;

  const statusOptions = [
    { value: 'Pending', label: '🕒 Pending', className: 'bg-warning text-dark' },
    { value: 'Processing', label: '⚙️ Processing', className: 'bg-info text-dark' },
    { value: 'Shipped', label: '📦 Shipped', className: 'bg-primary text-white' },
    { value: 'Delivered', label: '✅ Delivered', className: 'bg-success text-white' },
    { value: 'Cancelled', label: '❌ Cancelled', className: 'bg-danger text-white' },
  ];

  const current = statusOptions.find(opt => opt.value === currentStatus);
  return (
    <tr key={order.order_id}>
      <td>{index + 1}</td>
      <td>{order.user_name}</td>
      <td>{order.phone}</td>
      <td>{order.address}</td>
      <td>{order.total_amount}</td>

      <td>
        <div className="dropdown d-inline-block position-relative">
          <button
            className={`btn btn-sm dropdown-toggle ${current.className}`}
            onClick={() => setOpenDropdownId(order.order_id)}
          >
            {current.label}
          </button>

          {openDropdownId === order.order_id && (
            <ul className="dropdown-menu show position-absolute" style={{ zIndex: 1000 }}>
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
                    </div>
                </div>
            </div>
   
   </>
  )
}

export default Order
   
 