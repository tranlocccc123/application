import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>Liên hệ 24/7</h5>
            <p>+84 32 632 6276</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>Số 2 , Trường Sa</h5>
            <p>Quận Bình Thanh, TP.HCM</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-fax"></i>
            </div>
            <h5>Fax</h5>
            <p>0736 230 063</p>
          </div>
        </div> 
      </div>
      <div className="col-12 col-md-12 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-user"></i>
            </div>
            <h5>Nhóm Thương mại điện tử gồm các thành viên: </h5>
            <p>Trần Thị Hằng</p>
            <p>Lê Bá Lân</p>
          </div>
        </div>
    </div>
  );
};

export default ContactInfo;
