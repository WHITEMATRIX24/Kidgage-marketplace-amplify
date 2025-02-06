import React, { useEffect, useState } from "react";
import "./banner.css";
import { getAllBannersApi } from "../../../services/allApis";

const Banner = () => {
  const [bannerData, setBannerData] = useState({
    isLoading: true,
    banners: [],
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  // auto moving slider
  useEffect(() => {
    if (bannerData.banners.length === 0) return;

    const bannerDataLength = bannerData.banners.length;
    const intervalId = setInterval(() => {
      setCurrentIndex((prevValue) => (prevValue + 1) % bannerDataLength);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [bannerData]);

  // initial data fetching
  const getBannerInitialData = async () => {
    const data = await getAllBannersApi();
    if (data) {
      const filteredData = data.filter((banner) => banner.status === true);
      return setBannerData({ banners: filteredData, isLoading: false });
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
        <img src={bannerData.banners[currentIndex].imageUrl} alt="" />
      ) : (
        <p>no Banner</p>
      )}
    </div>
  );
};

export default Banner;
