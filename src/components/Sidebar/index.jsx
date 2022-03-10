import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import Heading from "../Heading";
import routes from "./routes";
import "./styles.scss";
const Sidebar = ({ onClose }) => {
  const [sidebarRoutes, setSidebarRoutes] = useState(() => routes);
  const [sidebarNavSub, setSidebarNavSub] = useState(false);
  //   const categories = useCategories({ params: { limit: 10 } });
  //   useEffect(() => {
  //     setSidebarRoutes((prevState) => {
  //       return prevState.map((st) => {
  //         if (st.to === "/the-loai") {
  //           return {
  //             ...st,
  //             childs: categories.data.map((cate) => ({
  //               name: cate.name,
  //               to: `/the-loai/${cate.slug}`,
  //             })),
  //           };
  //         } else {
  //           return st;
  //         }
  //       });
  //     });
  //   }, [categories.data]);
  //   console.log(sidebarRoutes);
  const handleShowSidebarNavSub = (e) => {
    // e.stopPropagation();
    console.log("click");
    setSidebarNavSub(!sidebarNavSub);
  };
  const handleClickLinkItem = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="sidebar">
      <Heading center>Menu</Heading>
      <ul className="sidebar-nav">
        {sidebarRoutes.map((route) => (
          <React.Fragment key={route.name}>
            <li className="sidebar-nav-item">
              <NavLink
                className="sidebar-nav-item__link"
                to={route.to}
                onClick={handleClickLinkItem}
              >
                {route.Icon()}
                {route.name}
                {route.childs && (
                  <p
                    className="icon icon--dropdown"
                    onClick={handleShowSidebarNavSub}
                  >
                    <i className="fa-solid fa-caret-right"></i>
                  </p>
                )}
              </NavLink>
            </li>
            {route.childs && (
              <ul
                className={classNames("sidebar-nav-sub", {
                  active: sidebarNavSub,
                })}
              >
                {route.childs.map((child) => (
                  <li key={child.name} className="sidebar-nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "sidebar-nav-item__link active"
                          : "sidebar-nav-item__link"
                      }
                      to={child.to}
                      onClick={handleClickLinkItem}
                    >
                      {child.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
