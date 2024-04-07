import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Tin tức</h2>
                <p>Nhập Email để nhận tin tức và khuyến mãi mới nhất!!!</p>
              <form className="form-section">
                <input placeholder="Your Email..." name="email" type="email" />
                <input value="Gửi" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
