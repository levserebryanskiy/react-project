import React from 'react';
import { Link } from 'react-router-dom';

const HeadComp = () => (
  <div>
    <Link to="/">Список дел </Link>
    <Link to="/addcategory"> Категории</Link>
  </div>
);

export default HeadComp;
