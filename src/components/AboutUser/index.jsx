import { useState } from "react";
import classNames from "classnames";
import styled from  "./AboutUser.module.sass";

const AboutUser = ({ isOpen, ipAddress, country, userId, onClose }) => {
  return (
    <div className={classNames(styled.modal, isOpen ? "open" : "")}>
      <div className={classNames(styled.modalContent)}>
        <button className={classNames(styled.closeBtn)} onClick={onClose}>
          Close
        </button>
        <h2>Modal Content</h2>
        <p>IP Address: {ipAddress}</p>
        <p>Country: {country}</p>
        <p>User ID: {userId}</p>
      </div>
    </div>
  );
};


export default AboutUser;
