import React from "react";
import { useEffect } from "react";
import cn from "classnames";
import "./Categories.scss";
import { changeNavAction } from "../../store/changeNavReduser";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchCategories, fetchFilteredProducts } from "../../store/actions";
import { Link } from "react-router-dom";
import { setCurrentCategoriesAction } from "../../store/categoriesReduser";

function Categories() {

  const dispatch: any = useAppDispatch();

  const loadFilteredProduct = (id: number)=>{
    dispatch(setCurrentCategoriesAction(id));
    dispatch(changeNavAction());
    dispatch(fetchFilteredProducts(id, 0 ,1000000));
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categories = useAppSelector((state: any) => state.categories.categories);

  return (
    <div className="catagories-side-menu">
      {/* Close Icon */}
      <div id="sideMenuClose" onClick={() => dispatch(changeNavAction())}>
        <i className="ti-close"></i>
      </div>
      {/*  Side Nav  */}
      <div className="nav-side-menu">
        <div className="menu-list">
          <h6>Categories</h6>
          <ul id="menu-content" className={cn("menu-content collapse out", "menu")}>
            {/* Single Item */}
            {categories?.map((item: any) => (
              <li key={item.id} data-toggle="collapse" data-target="#women" className="collapsed">
                <Link to="/shop" onClick={() => loadFilteredProduct(item.id)}>{item.name}</Link>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Categories;