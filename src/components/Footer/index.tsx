import { Link, Typography } from '@material-ui/core';
import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => (
  <footer className="footer">
    <a
      className="rsschool"
      href="https://rs.school/"
      target="_blank"
      rel="noreferrer"
    >
      {' '}
    </a>
    <div>
      <Typography>&copy; 2021, coded by:</Typography>

      <Typography>
        <Link
          href="https://github.com/lbratkovskaya"
          target="_blank"
          rel="noreferrer"
        >
          Larisa&nbsp;Arkaeva
        </Link>
      </Typography>
      <Typography>
        <Link
          href="https://github.com/Alexandr4e"
          target="_blank"
          rel="noreferrer"
        >
          Alexandr&nbsp;Chernousov
        </Link>
      </Typography>
      <Typography>
        <Link
          href="https://github.com/AlexeyTeterin"
          target="_blank"
          rel="noreferrer"
        >
          Alexey&nbsp;Teterin
        </Link>
      </Typography>
      <Typography>
        <Link
          href="https://github.com/Tonia-SE"
          target="_blank"
          rel="noreferrer"
        >
          Antonina&nbsp;Tregubova
        </Link>
      </Typography>

    </div>
  </footer>
);

export default Footer;
