import React from "react";
import Search from "../../components/common/search/search";
import Banner from "../../components/common/banner/banner";
import TopActivites from "../../components/landing/topActivites";
import TopBarands from "../../components/landing/topBarands";
import News from "../../components/landing/news";
import RecentEvents from "../../components/landing/recentEvents";

const Landing = () => {
  return (
    <div className="d-flex flex-column gap-5 pb-5">
      <Search />
      <Banner />
      <TopActivites />
      <TopBarands />
      <News />
      <RecentEvents />
    </div>
  );
};

export default Landing;
