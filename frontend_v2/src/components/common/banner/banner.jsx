import React, { useEffect, useState } from "react";
import "./banner.css";
import { getAllBannersApi } from "../../../services/allApis";

const Banner = () => {
  const [bannerData, setBannerData] = useState({
    isLoading: true,
    banners: [],
  });

  // initial data fetching
  const getBannerInitialData = async () => {
    const data = await getAllBannersApi();
    if (data) {
      return setBannerData({ banners: data, isLoading: false });
    }
    setBannerData({ isLoading: false, banners: [] });
  };
  useEffect(() => {
    getBannerInitialData();
  }, []);

  return (
    <div className="banner-container">
      {bannerData.isLoading ? (
        <p>Loading....</p>
      ) : bannerData.banners.length > 0 ? (
        <img src={bannerData.banners[0].imageUrl} alt="" />
      ) : (
        <p>no Banner</p>
      )}
    </div>
  );
};

export default Banner;
