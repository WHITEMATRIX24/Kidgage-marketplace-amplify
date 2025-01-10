import React from "react";
import Search from "../../components/common/search/search";
import Banner from "../../components/common/banner/banner";
import TopActivites from "../../components/landing/topActivites";

const Landing = () => {
  return (
    <div className="d-flex flex-column gap-5 pb-5">
      <Search />
      <Banner />
      <TopActivites />
    </div>
  );
};

export default Landing;
