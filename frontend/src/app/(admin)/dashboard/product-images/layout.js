'use client';
import {useState, useEffect } from 'react';
import { Home, Plus, Share2, Download ,Edit, Trash2 } from 'lucide-react';

import axios from 'axios';
const ProductImages = () => {
    // Fetch product images from the backend
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductImages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/product-image', {
                    withCredentials: true, // Include cookies for session management
                });
                console.log('Product Images:', response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching product images:', error);
            }
        }

        fetchProductImages();
    }, []);

    return (
        <>
        {/* ✅ Main Content */}
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
              Product Images
            </li>
          </ol>
        </nav>
        <h2 className="h1"> Product Images</h2>
        <p className="mb-0">Your web analytics dashboard template.</p>
      </div>

      <div className="btn-toolbar mb-2 mb-md-0">
        <button  type="button"
  className="btn btn-dark"
  data-bs-toggle="modal"
  data-bs-target="#addProductModal">
          <Plus size={16} className="me-2" />
          Add Products
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
                                    <th scope='col' className="border-0 rounded-end">Images</th>
                                    <th scope='col' className="border-0 rounded-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
             {
  products.map((prod, index) => (
    <tr key={prod.prod_id}>
      <td>{index + 1}</td>
      <td>{prod.prod_name}</td>

      <td>
        {prod.images && prod.images.length > 0 ? (
          prod.images.map((imageFile, i) => (
            <img
              className="img-fluid"
              key={i}
              src={`http://localhost:3001/uploads/product_images/${imageFile}`}
              alt={`Product ${i + 1}`}
             
              
              style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, marginRight: 5 }}
            />
          ))
        ) : (
          <span>No Images</span>
        )}
      </td>

      <td className='   d-flex gap-2'>
  <button
    className="btn btn-sm btn-primary me-2 d-flex align-items-center gap-1"
    onClick={() => handleEdit(prod)}
  >
    <Edit size={16} />
  </button>

  <button
    className="btn btn-sm btn-danger d-flex align-items-center gap-1"
    onClick={() => handleDelete(prod.prod_id)}
  >
    <Trash2 size={16} />
  </button>
</td>

    </tr>
  ))
}

                               
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </>
        
  )
}

export default ProductImages;