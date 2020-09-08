import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import LazyImage from './LazyImage';
import css from './ListItem.scss';

import failover from './assets/placeholder.jpg';

const ListItem = ({ item, category }) => (
  <Link
    className={css.module}
    to={category ?
      `/categories/${category}/${item.id}` :
      `/candidat/${item.id}`}
  >
    <article>
      <div className={css.imgContainer}>
        <LazyImage
          src={item.picture ?
            `/assets/${item.picture}` :
            `/assets/${item.circo}-${item.dep_num}.jpg`}
          failover={failover}
          alt={item.candidat_name}
          height="170"
        />
      </div>
      <p>Dpt {item.dep_num} - Circo {item.circo}</p>
      <h3>{item.candidat_name}</h3>
    </article>
  </Link>
);

ListItem.propTypes = {
  item: PropTypes.shape({
    candidat_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListItem;
