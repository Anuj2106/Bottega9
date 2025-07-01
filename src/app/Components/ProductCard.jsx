'use client';
import "../Css/productCard.css"
import Products from "../api/Products/route";

const ProductCard = () => {
  return (
    <section className="container my-5">
  <div className="d-flex flex-nowrap gap-3 mx-auto row product-card">

        {Products.map((image) => (
          <div
            className="card desktop-product-card p-0  col-md-3 col-sm-3 flex-shrink-0"
            key={image.id}
            
          >
            <div className="image-container ">
              <img
                src={image.imageUrl}
                alt="image"
                className="productCard-img img-fluid"
               
              />
            </div>
            <div className="card-body p-3">
              <div className="card-title d-flex justify-content-between px-1 align-items-center">
                <h6 className="m-0">{image.name}</h6>
                <span>
                  <span className="text-warning">&#9733;</span> 4.9
                </span>
              </div>
              <p className="card-text text-muted ps-1">{image.description}</p>
              <div className="d-flex justify-content-between mx-1">
                <strong>${image.price}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
 
    </section>
  );
};

export default ProductCard;
