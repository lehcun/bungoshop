import React from "react";

const Logo = () => {
  return (
    <div>
      <div className="flex flex-row text-lg font-semibold text-shop_light_blue hover:text-shop_dark_blue hoverEffect group">
        BUNGO
        <div className="text-shop_dark_blue group-hover:text-shop_light_blue">
          SHOP
        </div>
      </div>
    </div>
  );
};

export default Logo;
