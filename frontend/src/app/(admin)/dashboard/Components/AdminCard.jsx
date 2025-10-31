'use client';

import React from 'react';

const AdminCard = ({ color, icon, title, value, link }) => {
  return (
    <div className="col-lg-3 col-6">
      <div className={`small-box bg-${color}`}>
        <div className="inner">
          <h3>{value}</h3>
          <p>{title}</p>
        </div>
        <div className="icon">
          <i className={icon}></i>
        </div>
        <a href={link} className="small-box-footer">
          More info <i className="fa fa-arrow-circle-right"></i>
        </a>
      </div>
    </div>
  );
};

export default AdminCard;
