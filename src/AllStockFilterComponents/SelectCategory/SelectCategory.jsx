import { useState } from "react";
import "./SelectCategory.css";
const SelectCategory = ({title='Title'}) => {
  const [isThisCategoryChecked, setIsThisCategoryChecked] = useState(false);
  return (
    <div className="select_category_main">
      <span
        className="select_category_check_box_main"
        id={isThisCategoryChecked ? "select_category_main_checked" : null}
        onClick={() => {
          setIsThisCategoryChecked(!isThisCategoryChecked);
        }}
      >
        <svg
          id={
            isThisCategoryChecked
              ? "select_category_main_svg_active"
              : "select_category_main_svg_hide"
          }
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <span className="select_category_title_box">{title}</span>
    </div>
  );
};

export default SelectCategory;
