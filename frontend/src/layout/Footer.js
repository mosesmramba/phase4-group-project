import React from 'react';

function Footer() {
  return (
    <div>
      <footer className="p-2 bg-blue-100 text-black">
        <ul className="flex justify-center border-b m-2">
          <li className="m-2">
            <a href="https://github.com/">
              <i className="fa fa-github-square fa-2x text-black" aria-hidden="true"></i>
            </a>
          </li>
          <li className="m-2">
            <a href="https://ke.linkedin.com/">
              <i className="fa fa-linkedin-square fa-2x text-black" aria-hidden="true"></i>
            </a>
          </li>
          <li className="m-2">
            <a href="https://www.facebook.com/">
              <i className="fa fa-facebook-square fa-2x text-black" aria-hidden="true"></i>
            </a>
          </li>
          <li className="m-2">
            <a href="https://www.instagram.com/">
              <i className="fa fa-instagram fa-2x text-black" aria-hidden="true"></i>
            </a>
          </li>
          <li className="m-2">
            <a href="https://twitter.com/?lang=en">
              <i className="fa fa-twitter-square fa-2x text-black" aria-hidden="true"></i>
            </a>
          </li>
        </ul>

        <p className="float-right">
          <a className="text-black" href="/">
            Back to top
          </a>
        </p>
        <p className="text-center">
          &copy; 2024 RENT-A-CAR, Inc. | All Rights Reserved &middot;{' '}
          <a className="text-black" href="/">
            Privacy
          </a>{' '}
          &middot;{' '}
          <a className="text-black" href="/">
            Terms
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;