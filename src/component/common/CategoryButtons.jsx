import {Typography} from "@mui/material";
import React from "react";

const CategoryButtons =({categoryList}) =>{

    return <div className="button-div">
        {categoryList.map((category, idx) => (
            <button className="button-detail"
                    onClick={() => onClickHandler(category.value)}
                    type="button"
            >
                <img src={imgList[idx]}
                     width="100" height="auto"/>
                <Typography gutterBottom variant="h5" component="h2">
                    {category.label}
                </Typography>
            </button>
        ))}
    </div>
}

export default CategoryButtons;