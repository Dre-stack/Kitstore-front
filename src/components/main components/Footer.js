import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState();
  const handleChange = () => (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="footer">
      <div className="footer-main">
        <div className="footer-main-block">
          <h3 className="footer-main-block__header">Help</h3>
          <ul clasName="fooer-main-block__item">
            <li>
              {' '}
              <Link to="##">Contact Us</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="##">Your Account</Link>{' '}
            </li>
          </ul>
        </div>
        <div className="footer-main-block">
          <h3 className="footer-main-block__header">About</h3>
          <ul clasName="fooer-main-block__item">
            <li>
              {' '}
              <Link to="##">Kit Records</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="##">Careers</Link>{' '}
            </li>
          </ul>
        </div>
        <div className="footer-main-block">
          <h3 className="footer-main-block__header">
            Sign up to receive exclusive deals
          </h3>
          <div clasName="fooer-main-block__item">
            <form
              onSubmit={handleSubmit}
              className="form-wrapper footer-form"
            >
              <input
                type="text"
                value={email}
                placeholder="Enter your Email Address"
                onChange={handleChange}
                className="footer-form-input"
              />
              <input
                className="btn btn-type"
                type="submit"
                value="sign me up"
                placeholder="Enter your Email Address"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="footer-socials">
        <Link to="##">
          <i class="fab fa-instagram"></i>
        </Link>
        <Link to="##">
          <i class="fab fa-twitter"></i>
        </Link>
        <Link to="##">
          <i class="fab fa-facebook"></i>
        </Link>
        <Link to="##">
          <i class="fab fa-youtube"></i>
        </Link>
      </div>
      <div className="footer-copyright">
        <p>&copy;2020 Koeniglich Im Takt All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
