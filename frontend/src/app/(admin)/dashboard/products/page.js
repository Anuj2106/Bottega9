"use client";
import { useState, useEffect } from "react";
import {
  Home,
  Plus,
  Edit,
  Trash,
  Download,
  Eye,
  ListFilter,
  LayoutList,
} from "lucide-react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Swal from "sweetalert2";
import axios from "axios";
import { IconButton, Box } from "@mui/material";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

// 🔹 Custom Toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-secondary">
          <Eye size={16} /> Columns
        </button>
        <button className="btn btn-sm btn-outline-secondary">
          <ListFilter size={16} /> Filter
        </button>
        <button className="btn btn-sm btn-outline-secondary">
          <LayoutList size={16} /> Density
        </button>
        <button className="btn btn-sm btn-outline-secondary">
          <Download size={16} /> Export
        </button>
      </div>
      <GridToolbarQuickFilter placeholder="Search…" />
    </GridToolbarContainer>
  );
}

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [badges, setBadges] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    prod_name: "",
    prod_des: "",
    prod_review: "",
    prod_price: "",
    prodoffer_prize: "",
    stock_quantity: "",
    item_id: "",
    category_id: "",
    subcategory_id: "",
    badge_id: "",
    prod_status: "1",
    prod_color: "",
    prod_dimensions: "",
    prod_think: "",
  });
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product`);
      setProducts(res.data.products);
      setCategories(res.data.categories);
      setSubcategories(res.data.subcategory || []);
      setItems(res.data.items || []);
      setBadges(res.data.badges);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleEditChange = (e) =>
    setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // Add Product
  const handleAddProduct = async () => {
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        submitData.append(key, value)
      );
      images.forEach((img) => submitData.append("prod_img", img));

      await axios.post(`${apiUrl}/api/addproduct`, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Product Added!",
        timer: 1500,
        showConfirmButton: false,
      });
      setShowAddModal(false);
      fetchData();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to add product",
        text: err.message,
      });
    }
  };

  // Edit Product
  const handleEdit = (row) => {
    setEditFormData(row);
    setEditId(row.prod_id);
    setShowEditModal(true);
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`${apiUrl}/api/product/edit/${editId}`, editFormData);
      Swal.fire({
        icon: "success",
        title: "Product Updated!",
        timer: 1500,
        showConfirmButton: false,
      });
      setShowEditModal(false);
      fetchData();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update failed", text: err.message });
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${apiUrl}/api/product/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1500,
        showConfirmButton: false,
      });
      fetchData();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Delete failed", text: err.message });
    }
  };

  // Toggle Status
  const handleToggleStatus = async (prod) => {
    try {
      const newStatus = prod.prod_status === 1 ? 0 : 1;
      await axios.put(`${apiUrl}/api/product/status/${prod.prod_id}`, {
        status: newStatus,
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Columns
  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "prod_name", headerName: "Name", width: 200 },
    { field: "prod_des", headerName: "Description", width: 250 },
    { field: "prod_review", headerName: "Review", width: 100 },
    { field: "cat_name", headerName: "Category", width: 150 },
    { field: "sub_name", headerName: "Subcategory", width: 150 },
    { field: "item_name", headerName: "Items", width: 150 },
    { field: "prod_price", headerName: "Price", width: 100 },
    { field: "prodoffer_prize", headerName: "Offer Price", width: 120 },
    { field: "stock_quantity", headerName: "Stock", width: 100 },
    { field: "badge_name", headerName: "Badge", width: 120 },

    // New columns with fixed widths
    { field: "prod_color", headerName: "Color", width: 120 },
    { field: "prod_dimensions", headerName: "Dimensions", width: 150 },
    { field: "prod_think", headerName: "Product Think", width: 150 },

    {
      field: "prod_status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <button
          className={`btn btn-sm ${
            params.value === 1 ? "btn-success" : "btn-danger"
          }`}
          onClick={() => handleToggleStatus(params.row)}
        >
          {params.value === 1 ? "Active" : "Inactive"}
        </button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <Edit size={18} />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.prod_id)}
          >
            <Trash size={18} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = products.map((p, idx) => ({
    id: idx + 1,
    ...p,
    sub_name: p.sub_name || "", // show subcategory name
  }));

  return (
    <div className="container py-3">
      {/* Breadcrumb + Header */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">
              <Home size={16} />
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="/dashboard">Home</a>
          </li>
          <li className="breadcrumb-item active">Products</li>
        </ol>
      </nav>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Products</h3>
        <button
          className="btn btn-primary d-flex align-items-center gap-1"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* DataGrid */}
      <div style={{ width: "100%", overflowX: "auto" }}>
        <div style={{ minWidth: 1800 }}>
          {" "}
          {/* sum of all column widths */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
            disableRowSelectionOnClick
            components={{ Toolbar: CustomToolbar }}
          />
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prod_name"
                      value={formData.prod_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="prod_price"
                      value={formData.prod_price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.cat_id} value={cat.cat_id}>
                          {cat.cat_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Subcategory</label>
                    <select
                      className="form-select"
                      name="subcategory_id"
                      value={formData.subcategory_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories
                        .filter(
                          (sc) => sc.cat_id === Number(formData.category_id)
                        ) // convert to number if needed
                        .map((sc) => (
                          <option key={sc.sub_id} value={sc.sub_id}>
                            {sc.sub_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* Items */}
                  <div className="col-md-6">
                    <label className="form-label">Items</label>
                    <select
                      className="form-select"
                      name="item_id"
                      value={formData.item_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Item</option>
                      {items
                        .filter(
                          (item) =>
                            item.sub_id === Number(formData.subcategory_id)
                        ) // filter by selected subcategory
                        .map((item) => (
                          <option key={item.item_id} value={item.item_id}>
                            {item.item_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Badge</label>
                    <select
                      className="form-select"
                      name="badge_id"
                      value={formData.badge_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Badge</option>
                      {badges.map((b) => (
                        <option key={b.badge_id} value={b.badge_id}>
                          {b.badge_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="prod_status"
                      value={formData.prod_status}
                      onChange={handleChange}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                  {/* Dimensions */}
                  <div className="col-md-6">
                    <label className="form-label">Dimensions</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prod_dimensions"
                      value={editFormData.prod_dimensions || ""}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="prod_des"
                      value={formData.prod_des}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Review</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      name="prod_review"
                      className="form-control"
                      value={formData.prod_review}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Offer Price</label>
                    <input
                      type="number"
                      name="prodoffer_prize"
                      className="form-control"
                      value={formData.prodoffer_prize}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Stock Quantity</label>
                    <input
                      type="number"
                      name="stock_quantity"
                      className="form-control"
                      value={formData.stock_quantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Color</label>
                    <input
                      type="text"
                      name="prod_color"
                      className="form-control"
                      value={formData.prod_color}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Dimensions</label>
                    <input
                      type="text"
                      name="prod_dimensions"
                      className="form-control"
                      value={formData.prod_dimensions}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Product Think</label>
                    <textarea
                      className="form-control"
                      name="prod_think"
                      value={formData.prod_think}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Images</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className="form-control"
                    />
                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {imagePreviews.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          width={80}
                          height={80}
                          className="rounded border"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleAddProduct}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title">Edit Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {/* Product Name */}
                  <div className="col-md-6">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prod_name"
                      value={editFormData.prod_name || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  {/* Price */}
                  <div className="col-md-6">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="prod_price"
                      value={editFormData.prod_price || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="col-md-12">
                    <label className="form-label">Product Description</label>
                    <textarea
                      className="form-control"
                      name="prod_des"
                      value={editFormData.prod_des || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  {/* Offer Price */}
                  <div className="col-md-6">
                    <label className="form-label">Offer Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="prodoffer_prize"
                      value={editFormData.prodoffer_prize || ""}
                      onChange={handleEditChange}
                    />
                  </div>

                  {/* Stock Quantity */}
                  <div className="col-md-6">
                    <label className="form-label">Stock Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="stock_quantity"
                      value={editFormData.stock_quantity || ""}
                      onChange={handleEditChange}
                    />
                  </div>

                  {/* Review */}
                  <div className="col-md-6">
                    <label className="form-label">Review</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      className="form-control"
                      name="prod_review"
                      value={editFormData.prod_review || ""}
                      onChange={handleEditChange}
                    />
                  </div>

                  {/* Category */}
                  <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category_id"
                      value={editFormData.category_id || ""}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.cat_id} value={cat.cat_id}>
                          {cat.cat_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory */}
                  <div className="col-md-6">
                    <label className="form-label">Subcategory</label>
                    <select
                      className="form-select"
                      name="subcategory_id"
                      value={editFormData.subcategory_id || ""}
                      onChange={handleEditChange}
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories
                        .filter(
                          (sc) => sc.cat_id === Number(editFormData.category_id)
                        )
                        .map((sc) => (
                          <option key={sc.sub_id} value={sc.sub_id}>
                            {sc.sub_name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Badge */}
                  <div className="col-md-6">
                    <label className="form-label">Badge</label>
                    <select
                      className="form-select"
                      name="badge_id"
                      value={editFormData.badge_id || ""}
                      onChange={handleEditChange}
                    >
                      <option value="">Select Badge</option>
                      {badges.map((badge) => (
                        <option key={badge.badge_id} value={badge.badge_id}>
                          {badge.badge_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="prod_status"
                      value={editFormData.prod_status || "1"}
                      onChange={handleEditChange}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>

                  {/* Color */}
                  <div className="col-md-6">
                    <label className="form-label">Color</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prod_color"
                      value={editFormData.prod_color || ""}
                      onChange={handleEditChange}
                    />
                  </div>

                  {/* Product Think */}
                  <div className="col-md-12">
                    <label className="form-label">
                      Product Think (Features / Additional Info)
                    </label>
                    <textarea
                      className="form-control"
                      name="prod_think"
                      value={editFormData.prod_think || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-warning text-white"
                  onClick={handleUpdateProduct}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
