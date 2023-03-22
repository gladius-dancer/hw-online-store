import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Slider from "@mui/material/Slider";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { fetchFilteredProducts } from "../../store/actions";


function SideBar() {

  const dispatch: any = useAppDispatch();
  const categories = useAppSelector((state: any) => state.categories.categories);
  const [value, setValue] = React.useState<number[]>([0, 10000]);
  const currentCategory = useAppSelector(state=>state.categories).current;

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const loadFilteredProduct = (id: number=1, min: number, max: number)=>{
    dispatch(fetchFilteredProducts(id, min ,max));
  }

  return (
    <div className="col-12 col-md-4 col-lg-3">
      <div className="shop_sidebar_area">

        <div className="widget catagory mb-50">
          {/*  Side Nav  */}
          <div className="nav-side-menu">
            <h6 className="mb-0">Catagories</h6>
            <div className="menu-list">
              <ul className="menu-content collapse pl-0">
                {
                  categories.map((category: any) => (
                    <li key={category.id} onClick={()=>loadFilteredProduct(category.id, value[0], value[1])}>
                      <Link to={""}>{category.name}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>

        <div className="widget price mb-50">
          <h6 className="widget-title mb-30">Filter by Price</h6>
          <div className="widget-desc">
            <ThemeProvider theme={theme}>
              <Slider
                getAriaLabel={() => "Price range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                color="secondary"
                min={0}
                max={10000}
              />
            </ThemeProvider>
            <div className="help-line mt-4 userName" onClick={()=>loadFilteredProduct(currentCategory, value[0], value[1])}>
              <a className="justify-content-center">
                Filter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;