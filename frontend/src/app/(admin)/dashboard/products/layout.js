'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Home, Plus, Share2, Download, Edit, Trash } from 'lucide-react';

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [badges, setBadges] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);

  const [editFormData, setEditFormData] = useState({
    prod_name: "",
    prod_des: "",
    prod_price: "",
    prodoffer_prize: "",
    stock_quantity: "",
    cat_id: "",
    badge_id: "",
    prod_status: "1",
    prod_color: "",
    prod_dimensions: "",
    prod_think: "",
    prod_review: "",
    prod_id: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    prod_name: '',
    prod_des: '',
    prod_review: '',
    prod_price: '',
    prodoffer_prize: '',
    stock_quantity: '',
    category_id: '',
    badge_id: '',
    prod_status: '1', // Default to active
    prod_color: '',
    prod_dimensions: '',
    prod_think: '',
  });

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/product');
      setProducts(res.data.products);
      setCategories(res.data.categories);
      setBadges(res.data.badges);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };


  // handleSubmit, handleToggleStatus, handleEditProduct, handleEditChange, handleEditSubmit, handleDeleteProduct ...
 const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    images.forEach((img) => {
      submitData.append("prod_img", img); // Name should match multer field
    });

   try {
  const res = await axios.post("http://localhost:3001/api/addproduct", submitData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // console.log("Product added:", res.data);

  // Show success alert
  Swal.fire({
    icon: 'success',
    title: 'Product Added',
    text: 'Your product has been successfully added!',
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    // Refresh the page after alert closes
    window.location.reload()
   fetchData();
  });

} catch (err) {
  console.error("Post failed:", err);

  // Show error alert
  Swal.fire({
    icon: 'error',
    title: 'Failed to Add Product',
    text: 'Something went wrong while adding the product!',
  });
}
  };
  const handleToggleStatus = async (productId, currentStatus) => {
  const newStatus = currentStatus === 1 ? 0 : 1;

  try {
    await axios.put(`http://localhost:3001/api/product/status/${productId}`, {
      status: newStatus,
    });

    // Optionally update the local state or refetch data
    setProducts(prev =>
      prev.map(prod =>
        prod.prod_id === productId ? { ...prod, prod_status: newStatus } : prod
      )
    );
  } catch (error) {
    console.error('Error updating product status:', error);
  }
};

const handleEditProduct = (product) => {
  setEditFormData(product);
};

const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditFormData((prev) => ({ ...prev, [name]: value }));
};


const handleEditSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  for (const key in editFormData) {
    formData.append(key, editFormData[key]);
  }

  try {
    const res = await axios.put(
      `http://localhost:3001/api/product/edit/${editFormData.prod_id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    Swal.fire({
      icon: 'success',
      title: 'Product Updated',
      text: 'Your product has been successfully updated!',
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      // Refresh the page after alert closes
      fetchData();
    });

    // Optionally refresh product list or close modal
    document.querySelector('#editProductModal .btn-close').click(); // closes modal // if you have a function to reload products

  } catch (error) {
    console.error('Update failed:', error);
  }
};
const handleDeleteProduct = async (productId) => {
  try {
    await axios.delete(`http://localhost:3001/api/product/${productId}`);
    Swal.fire({
      icon: 'success',
      title: 'Product Deleted',
      text: 'Your product has been successfully deleted!',
      timer: 2000,
      showConfirmButton: false,
    });
    fetchData();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Failed to Delete Product',
      text: 'Something went wrong while deleting the product!',
    });

    console.error('Error deleting product:', error);
  }
};  






  const filteredProducts = products.filter((prod) =>
    prod.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / entriesToShow);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * entriesToShow,
    currentPage * entriesToShow
  );
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const truncateDescription = (text, maxWords = 15) => {
    const words = text?.split(" ") || [];
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
  };

  return (
    <>
      {/* Breadcrumb and Toolbar */}
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
              <li className="breadcrumb-item active" aria-current="page">Products</li>
            </ol>
          </nav>
          <h2 className="h1">All Products</h2>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>

        <div className="btn-toolbar mb-2 mb-md-0">
          <button 
            type="button"
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#addProductModal"
          >
            <Plus size={16} className="me-2" />
            Add Products
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

      {/* Table with Pagination and Search */}
      <div className="card border-0 shadow mb-4">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <label className="me-2">Show</label>
              <select
                value={entriesToShow}
                onChange={(e) => {
                  setEntriesToShow(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="form-select d-inline-block w-auto"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <span className="ms-2">entries</span>
            </div>

            <div className="d-flex align-items-center">
              <label className="me-2 mb-0">Search:</label>
              <input
                type="text"
                className="form-control"
                aria-label="Search products..."
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-centered table-nowrap mb-0 rounded" role="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col" className="border-0 rounded-start">#</th>
                  <th scope="col" className="border-0">Name</th>
                  <th scope="col" className="border-0">Description</th>
                  <th scope="col" className="border-0">Review</th>
                  <th scope="col" className="border-0">Category</th>
                  <th scope="col" className="border-0">Price</th>
                  <th scope="col" className="border-0">Offer Price</th>
                  <th scope="col" className="border-0">Stocks</th>
                  <th scope="col" className="border-0">Badges</th>
                  <th scope="col" className="border-0">Status</th>
                  <th scope="col" className="border-0 rounded-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((prod, index) => (
                  <tr key={prod.prod_id}>
                    <td>{(currentPage - 1) * entriesToShow + index + 1}</td>
                    <td>{prod.prod_name}</td>
                    <td>{truncateDescription(prod.prod_des)}</td>
                    <td>{prod.prod_review}</td>
                    <td>{prod.cat_name}</td>
                    <td>{prod.prod_price}</td>
                    <td>{prod.prodoffer_prize}</td>
                    <td>{prod.stock_quantity}</td>
                    <td>{prod.badge_name}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${prod.prod_status === 1 ? 'btn-success' : 'btn-danger'}`}
                        onClick={() => handleToggleStatus(prod.prod_id, prod.prod_status)}
                      >
                        {prod.prod_status === 1 ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editProductModal"
                        onClick={() => handleEditProduct(prod)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteProduct(prod.prod_id)}
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing {(currentPage - 1) * entriesToShow + 1} to{" "}
            {Math.min(currentPage * entriesToShow, filteredProducts.length)} of{" "}
            {filteredProducts.length} entries
          </div>
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Add Product Modal */}
      <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title" id="addProductModalLabel">Add New Product</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body row g-3">
                {/* Product Name & Price */}
                <div className="col-md-6">
                  <label htmlFor="prod_name" className="form-label">Product Name</label>
                  <input type="text" name="prod_name" className="form-control" value={formData.prod_name} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                  <label htmlFor="prod_price" className="form-label">Price</label>
                  <input type="number" name="prod_price" className="form-control" value={formData.prod_price} onChange={handleChange} required />
                </div>

                {/* Description */}
                <div className="col-md-12">
                  <label htmlFor="prod_des" className="form-label">Product Description</label>
                  <textarea name="prod_des" className="form-control" value={formData.prod_des} onChange={handleChange} required />
                </div>

                {/* Offer Price & Stock */}
                <div className="col-md-6">
                  <label htmlFor="prodoffer_prize" className="form-label">Offer Price</label>
                  <input type="number" name="prodoffer_prize" className="form-control" value={formData.prodoffer_prize} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                  <label htmlFor="stock_quantity" className="form-label">Stock Quantity</label>
                  <input type="number" name="stock_quantity" className="form-control" value={formData.stock_quantity} onChange={handleChange} />
                </div>

                {/* Review */}
                <div className="col-md-6">
                  <label className="form-label">Review</label>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    max="5"
                    name="prod_review"
                    value={formData.prod_review}
                    className="form-control"
                    onChange={handleChange}
                    multiple
                  />
                </div>

                {/* Category & Badge */}
                <div className="col-md-6">
                  <label htmlFor="category_id" className="form-label">Category</label>
                  <select name="category_id" className="form-select" value={formData.category_id} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.cat_id} value={cat.cat_id}>{cat.cat_name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="badge_id" className="form-label">Badge</label>
                  <select name="badge_id" className="form-select" value={formData.badge_id} onChange={handleChange}>
                    <option value="">Select Badge</option>
                    {badges.map((badge) => (
                      <option key={badge.badge_id} value={badge.badge_id}>{badge.badge_name}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="col-md-6">
                  <label htmlFor="prod_status" className="form-label">Status</label>
                  <select name="prod_status" className="form-select" value={formData.prod_status} onChange={handleChange} required>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                {/* New fields added */}

                <div className="col-md-6">
                  <label htmlFor="prod_color" className="form-label">Color</label>
                  <input
                    type="text"
                    name="prod_color"
                    className="form-control"
                    value={formData.prod_color || ''}
                    onChange={handleChange}
                    placeholder="e.g., Red, Blue, Black"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="prod_dimensions" className="form-label">Dimensions</label>
                  <input
                    type="text"
                    name="prod_dimensions"
                    className="form-control"
                    value={formData.prod_dimensions || ''}
                    onChange={handleChange}
                    placeholder="e.g., H: 85cm × W: 55cm × D: 60cm"
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="prod_think" className="form-label">Product Think (Features / Additional Info)</label>
                  <textarea
                    name="prod_think"
                    className="form-control"
                    value={formData.prod_think || ''}
                    onChange={handleChange}
                    placeholder="Add any key product features or additional information here"
                    rows={3}
                  />
                </div>

                {/* Images Upload */}
                <div className="col-md-6">
                  <label className="form-label">Upload Images</label>
                  <input type="file" name="prod_img" className="form-control" onChange={handleImageChange} multiple />
                  <div className="mt-2 d-flex flex-wrap gap-2">
                    {imagePreviews.map((src, idx) => (
                      <img key={idx} src={src} alt="Preview" width={80} height={80} className="rounded border" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-success">Add Product</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Product Modal */}
      {/* Edit Product Modal */}
<div className="modal fade" id="editProductModal" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <form onSubmit={handleEditSubmit} method="POST" encType="multipart/form-data">
      <div className="modal-content">
        <div className="modal-header bg-warning text-white">
          <h5 className="modal-title" id="editProductModalLabel">Edit Product</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div className="modal-body row g-3">
          {/* Product Name & Price */}
          <div className="col-md-6">
            <label htmlFor="prod_name" className="form-label">Product Name</label>
            <input type="text" name="prod_name" className="form-control" value={editFormData.prod_name || ''} onChange={handleEditChange} required />
          </div>
          <div className="col-md-6">
            <label htmlFor="prod_price" className="form-label">Price</label>
            <input type="number" name="prod_price" className="form-control" value={editFormData.prod_price || ''} onChange={handleEditChange} required />
          </div>
          
          {/* Description */}
          <div className="col-md-12">
            <label htmlFor="prod_des" className="form-label">Product Description</label>
            <textarea name="prod_des" className="form-control" value={editFormData.prod_des || ''} onChange={handleEditChange} required />
          </div>
          
          {/* Offer Price & Stock */}
          <div className="col-md-6">
            <label htmlFor="prodoffer_prize" className="form-label">Offer Price</label>
            <input type="number" name="prodoffer_prize" className="form-control" value={editFormData.prodoffer_prize || ''} onChange={handleEditChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="stock_quantity" className="form-label">Stock Quantity</label>
            <input type="number" name="stock_quantity" className="form-control" value={editFormData.stock_quantity || ''} onChange={handleEditChange} />
          </div>
          
          {/* Review */}
          <div className="col-md-6">
            <label className="form-label">Review</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="prod_review"
              value={editFormData.prod_review || ''}
              className="form-control"
              onChange={handleEditChange}
            />
          </div>
          
          {/* Category & Badge */}
          <div className="col-md-6">
            <label htmlFor="cat_id" className="form-label">Category</label>
            <select name="cat_id" className="form-select" value={editFormData.cat_id || ''} onChange={handleEditChange} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.cat_id} value={cat.cat_id}>{cat.cat_name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="badge_id" className="form-label">Badge</label>
            <select name="badge_id" className="form-select" value={editFormData.badge_id || ''} onChange={handleEditChange}>
              <option value="">Select Badge</option>
              {badges.map((badge) => (
                <option key={badge.badge_id} value={badge.badge_id}>{badge.badge_name}</option>
              ))}
            </select>
          </div>
          
          {/* Status */}
          <div className="col-md-6">
            <label htmlFor="prod_status" className="form-label">Status</label>
            <select name="prod_status" className="form-select" value={editFormData.prod_status || '1'} onChange={handleEditChange} required>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          
          {/* New Fields */}
          <div className="col-md-6">
            <label htmlFor="prod_color" className="form-label">Color</label>
            <input
              type="text"
              name="prod_color"
              className="form-control"
              value={editFormData.prod_color || ''}
              onChange={handleEditChange}
              placeholder="e.g., Red, Blue, Black"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="prod_dimensions" className="form-label">Dimensions</label>
            <input
              type="text"
              name="prod_dimensions"
              className="form-control"
              value={editFormData.prod_dimensions || ''}
              onChange={handleEditChange}
              placeholder="e.g., H: 85cm × W: 55cm × D: 60cm"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="prod_think" className="form-label">Product Think (Features / Additional Info)</label>
            <textarea
              name="prod_think"
              className="form-control"
              value={editFormData.prod_think || ''}
              onChange={handleEditChange}
              placeholder="Add any key product features or additional information here"
              rows={3}
            />
          </div>

          {/* Images: Optional - for editing images */}
          {/* 
          <div className="col-md-6">
            <label className="form-label">Upload Images</label>
            <input type="file" name="prod_img" className="form-control" onChange={handleImageChange} multiple />
            <div className="mt-2 d-flex flex-wrap gap-2">
              {imagePreviews.map((src, idx) => (
                <img key={idx} src={src} alt="Preview" width={80} height={80} className="rounded border" />
              ))}
            </div>
          </div>
          */}
        </div>

        <div className="modal-footer">
          <button type="submit" className="btn btn-warning text-white">Update Product</button>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</div>

    </>
  );
};

export default Product;
