import React from "react";

import { Glyphicon } from "react-bootstrap";
import { Link } from "react-router-dom";

const SuccessMessage = () => {
  return (
    <div className="success">
      <Glyphicon glyph="ok" />
      <p>Your password has been reset.</p>
      <p>
        <Link to="/login">Click here to login with your new credentials.</Link>
      </p>
    </div>
  );
};

export default SuccessMessage;
