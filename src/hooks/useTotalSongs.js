import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useTotalSongs = () => {
  const { songListPrev, songListNext } = useSelector((state) => state.playlist);
  const totalSongs = useMemo(() => {
    if (songListPrev?.length > 0 || songListNext?.length > 0) {
      const total = songListPrev.length + songListNext.length;
      if (total >= 99) {
        return '99+';
      } else {
        return total;
      }
    } else {
      return '';
    }
  }, [songListNext?.length, songListPrev?.length]);
  return totalSongs;
};

export default useTotalSongs;
