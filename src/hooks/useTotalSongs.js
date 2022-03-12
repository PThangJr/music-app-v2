import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useTotalSongs = () => {
  const { songListPrev, songListNext } = useSelector((state) => state.playlist);
  const totalSongs = useMemo(() => {
    if (songListPrev.length && songListNext.length) {
      const total = songListPrev.length + songListNext.length;
      if (total >= 99) {
        return '99+';
      } else {
        return total;
      }
    } else {
      return '';
    }
  }, [songListNext, songListPrev]);
  return totalSongs;
};

export default useTotalSongs;
