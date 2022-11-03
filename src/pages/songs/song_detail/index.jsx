import React from 'react';
import { useParams } from 'react-router-dom';

const SongDetailPage = () => {
  const { slug } = useParams();
  // console.log(slug);
  return <div>SongDetailPage</div>;
};

export default SongDetailPage;
