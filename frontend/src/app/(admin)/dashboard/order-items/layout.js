'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Home, Share2, Download ,Edit, Trash2 } from 'lucide-react';
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;


const OrderItems = () => {
    
    const [ordersItem, setOrdersItem] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/order-item`, {
                    withCredentials: true, // Include cookies for session management
                });
                console.log('Orders:', response.data);
                setOrdersItem(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        fetchOrders();
    }, []);
    

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
             Order Items
            </li>
          </ol>
        </nav>
        <h2 className="h1"> Order Items </h2>
        <p className="mb-0">Your web analytics dashboard template.</p>
      </div>

      <div className="btn-toolbar mb-2 mb-md-0">
        
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
                                    <th scope='col' className="border-0 rounded-end">Order ID </th>
                                    <th scope='col' className="border-0 rounded-end">Quantity </th>
                                    <th scope='col' className="border-0 rounded-end">Price </th>

                                    {/* <th className="border-0 rounded-end">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
         {ordersItem.map((order, index) => (
  <tr key={order.order_item_id}>
    <td>{index + 1}</td>
    <td>{order.prod_name}</td>
    <td>{order.order_id}</td>
    <td>{order.quantity}</td>
    <td>{order.price}</td>
 


  </tr>
))}


    

   

                               
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
   
   </>
  )
}

export default OrderItems
   
 