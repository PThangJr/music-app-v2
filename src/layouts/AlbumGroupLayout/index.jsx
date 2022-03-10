import React from "react";
import { Link } from "react-router-dom";
import CardAlbum from "../../components/CardAlbum";
import "./styles.scss";

const AlbumGroupLayout = ({ data }) => {
  if (!data[data?.albumGroup?.name]) {
    return null;
  }
  return (
    <div className="album-group-layout">
      <div className="layout">
        <header className="layout-header">
          <Link
            className="layout-header__link"
            to={`/album_groups/${data?.albumGroup?.slug}`}
          >
            {data?.albumGroup?.name}
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </Link>
        </header>
        <div className="row row-cols-xl-6">
          {data[data?.albumGroup?.name] &&
            data[data?.albumGroup?.name].map((item) => (
              <div key={item?._id} className="col">
                <CardAlbum album={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumGroupLayout;
