'use client';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { IconButton, Box, Select, MenuItem } from '@mui/material';
import { Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/api/order/admin/all`);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Failed to fetch orders',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Delete Order
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This order will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });
    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${apiUrl}/api/order/delete/${id}`);
      Swal.fire({ icon: 'success', title: 'Deleted successfully!' });
      fetchOrders();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || err.message,
      });
    }
  };

  // ✅ Update Order Status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${apiUrl}/api/order/admin/update-status/${orderId}`, {
        order_status: newStatus,
      });
      Swal.fire({ icon: 'success', title: 'Status updated!' });
      fetchOrders();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || err.message,
      });
    }
  };

  // ✅ Table Columns
  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'name', headerName: 'Customer Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'contact', headerName: 'Contact', width: 130 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'city', headerName: 'City', width: 120 },
    { field: 'state', headerName: 'State', width: 120 },
    { field: 'zip', headerName: 'Zip', width: 100 },
    { field: 'subtotal', headerName: 'Subtotal', width: 120 },
    { field: 'shipping_fee', headerName: 'Shipping', width: 120 },
    { field: 'grand_total', headerName: 'Grand Total', width: 120 },
    {
      field: 'order_status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
       <Select
  value={params.row.order_status} // ✅ shows the current status
  onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
  size="small"
>
  <MenuItem value="pending">Pending</MenuItem>
  <MenuItem value="processing">Processing</MenuItem>
  <MenuItem value="completed">Completed</MenuItem>
  <MenuItem value="cancelled">Cancelled</MenuItem>
</Select>

      ),
    },
    { field: 'created_at', headerName: 'Created At', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            color="primary"
            component="a"
            href={`/orders/${params.row.id}`}
          >
            <Eye size={18} />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Trash2 size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  // ✅ Format Rows
  const rows = orders.map((order) => ({
    id: order.order_id,
    name: order.name,
    email: order.email,
    contact: order.contact,
    address: order.address,
    city: order.city,
    state: order.state,
    zip: order.zip,
    subtotal: order.subtotal,
    shipping_fee: order.shipping_fee,
    grand_total: order.grand_total,
    order_status: order.order_status,
    created_at: new Date(order.created_at).toLocaleString(),
  }));

  return (
    <div style={{ width: '100%', padding: 16 }}>
      <h3>Orders</h3>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          autoHeight
          loading={loading}
          components={{
            Toolbar: () => <GridToolbarQuickFilter placeholder="Search…" />,
          }}
        />
      </div>
    </div>
  );
};

export default Orders;
