'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Home, Plus, Share2, Download, Edit, Trash } from 'lucide-react';
import { DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport, } from '@mui/x-data-grid';
  function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <GridToolbarQuickFilter /> {/* 🔍 search box */}
    </GridToolbarContainer>
  );
}

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [badges, setBadges] = useState([]);
  const [products, setProducts] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

  const [editFormData, setEditFormData] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    prod_name: '',
    prod_des: '',
    prod_review: '',
    prod_price: '',
    prodoffer_prize: '',
    stock_quantity: '',
    category_id: '',
    badge_id: '',
    prod_status: '1',
    prod_color: '',
    prod_dimensions: '',
    prod_think: '',
  });

  // Fetch Products, Categories, Badges
  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product`);
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
  const handleChange = (e) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); }; const handleImageChange = (e) => { const files = Array.from(e.target.files); setImages(files); const previews = files.map(file => URL.createObjectURL(file)); setImagePreviews(previews); };
  //  Submit 
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
  const res = await axios.post(`${apiUrl}/api/addproduct`, submitData, {
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

  // Toggle Product Status
  const handleToggleStatus = async (productId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      await axios.put(`${apiUrl}/api/product/status/${productId}`, {
        status: newStatus,
      });
      setProducts((prev) =>
        prev.map((prod) =>
          prod.prod_id === productId ? { ...prod, prod_status: newStatus } : prod
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Edit
  const handleEditProduct = (product) => {
    setEditFormData(product);
  
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/api/product/edit/${editFormData.prod_id}`,
        editFormData
      );
      Swal.fire('Updated!', 'Product updated successfully.', 'success');
      fetchData();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Delete
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${apiUrl}/api/product/${productId}`);
      Swal.fire('Deleted!', 'Product deleted successfully.', 'success');
      fetchData();
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete product.', 'error');
    }
  };

  // DataGrid columns
  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'prod_name', headerName: 'Name', width: 200 },
    {
      field: 'prod_des',
      headerName: 'Description',
      width: 250,
      renderCell: (params) =>
        params.value?.length > 40
          ? `${params.value.slice(0, 40)}...`
          : params.value,
    },
    { field: 'prod_review', headerName: 'Review', width: 100 },
    { field: 'cat_name', headerName: 'Category', width: 150 },
    { field: 'prod_price', headerName: 'Price', width: 100 },
    { field: 'prodoffer_prize', headerName: 'Offer Price', width: 120 },
    { field: 'stock_quantity', headerName: 'Stock', width: 100 },
    { field: 'badge_name', headerName: 'Badge', width: 120 },
    {
      field: 'prod_status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <button
          className={`btn btn-sm ${
            params.value === 1 ? 'btn-success' : 'btn-danger'
          }`}
          onClick={() =>
            handleToggleStatus(params.row.prod_id, params.row.prod_status)
          }
        >
          {params.value === 1 ? 'Active' : 'Inactive'}
        </button>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => handleEditProduct(params.row)}
            data-bs-toggle="modal" data-bs-target="#editProductModal"
          >
            <Edit size={14} />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteProduct(params.row.prod_id)}
          >
            <Trash size={14} />
          </button>
        </>
      ),
    },
  ];

  const rows = products.map((p, i) => ({
    id: i + 1,
    ...p,
  }));

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
              <li className="breadcrumb-item active" aria-current="page">
                Products
              </li>
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
            <button
              type="button"
              className="btn btn-sm btn-success btn-outline-gray-600"
            >
              <Share2 size={14} className="me-1" /> Share
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary btn-outline-gray-600"
            >
              <Download size={14} className="me-1" /> Export
            </button>
          </div>
        </div>
      </div>

      {/* DataGrid inside Card */}
      <div className="card border-0 shadow mb-4">
        <div className="card-header">
          <h5 className="mb-0">Products List</h5>
        </div>
        <div className="card-body">
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableRowSelectionOnClick
              slots={{ toolbar: CustomToolbar }} // ✅ new toolbar
            />
          </div>
        </div>
      </div>

      {/* Add Product Modal + Edit Product Modal (keep your existing ones) */}
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
