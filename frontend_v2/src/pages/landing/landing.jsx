import React from "react";
import Search from "../../components/common/search/search";
import Banner from "../../components/common/banner/banner";
import TopActivites from "../../components/landing/topActivites";

const Landing = () => {
  return (
    <div>
      <Search />
      <Banner />
      <TopActivites />
    </div>
  );
};

export default Landing;
