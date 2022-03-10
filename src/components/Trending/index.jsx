import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAlbums } from "../../pages/albums/albumSlice";
import CardAlbum from "../CardAlbum";
import AlbumContainer from "../../containers/AlbumContainer";
import CardSkeletons from "../CardAlbum/CardSkeletons";
const Trending = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums({ params: { sort: "-createdAt", limit: 12 } }));
  }, [dispatch]);
  const albums = useSelector((state) => state.albums) ?? { data: [] };
  // console.log(albums);
  const settings = {
    simple: {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
    },
    center: {
      dots: true,
      autoplay: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 4,
      slidesToScroll: 4,
      speed: 1000,
      centerMode: false,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 993,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            className: "center",
            centerMode: true,
            dots: false,
            speed: 1000,
          },
        },
      ],
    },
  };
  const renderTrendingItem = () => {
    if (albums?.isLoading) {
      return [...Array(6)].map((item) => (
        <div key={"trending-item" + item} className="trending-item">
          <div className="card-skeleton" style={{ minHeight: "250px" }}>
            <div className="card-skeleton__loader"></div>
          </div>
        </div>
      ));
    } else {
      return albums?.data?.map((album) => (
        <div className="trending-item" key={album?._id}>
          <CardAlbum album={album} />
        </div>
      ));
    }
  };
  return (
    <div className="trending">
      <Slider {...settings.center}>{renderTrendingItem()}</Slider>
    </div>
  );
};

export default Trending;
