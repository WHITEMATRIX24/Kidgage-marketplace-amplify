import React from "react";
import "./topActivites.css";
import { Link } from "react-router";

const TopActivites = () => {
  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex flex-column gap-1">
        <h6 className="m-0 fs-3 fw-bold">Top Activites</h6>
        <p className="m-0 fw-medium">Fun that shapes the future</p>
      </div>
      <div className="cards-container">
        <div className="cards-content-wrapper">
          <Link to={"/activites"}>
            <div className="card-box">
              <img
                src="https://s3-alpha-sig.figma.com/img/6037/a4bb/b2a43655cb0ab4471a3a05e24a0745cd?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SIncTG1Ahc2mTySLEtKpR3dMyULqyhCQf-4vE~SMgRYD9KOQSzi1ZrzHhTCQYLvdUfgz3kMWse7FdEib1VZgAfqGgOwOLJoxiTrCEctMzzEXcfRikQPGd1mbxh-SajsO-5TbhjDW~1vbLJmxUmbq~LREjoSYuZBlaqd1xXRRSkMosv0ZEIBXjHk4ne~e5GGx84SpnWtI4EZbznzcVudrlbWKe~LmGWNDgzrgSqpF5q6r6jVAdQh5uq9VvhHS1IDGI2E~S93mA~U4g3YsTWkdMeC2t8bjEGhO9i3pmF96H7txRzdCWIlqBdIUkwJhuqV76mqVnJVz4lLHVcmoaOScGA__"
                alt=""
              />
              <button className="card-box-btn">Football</button>
            </div>
          </Link>
          <div className="card-box">
            <img
              src="https://s3-alpha-sig.figma.com/img/6037/a4bb/b2a43655cb0ab4471a3a05e24a0745cd?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SIncTG1Ahc2mTySLEtKpR3dMyULqyhCQf-4vE~SMgRYD9KOQSzi1ZrzHhTCQYLvdUfgz3kMWse7FdEib1VZgAfqGgOwOLJoxiTrCEctMzzEXcfRikQPGd1mbxh-SajsO-5TbhjDW~1vbLJmxUmbq~LREjoSYuZBlaqd1xXRRSkMosv0ZEIBXjHk4ne~e5GGx84SpnWtI4EZbznzcVudrlbWKe~LmGWNDgzrgSqpF5q6r6jVAdQh5uq9VvhHS1IDGI2E~S93mA~U4g3YsTWkdMeC2t8bjEGhO9i3pmF96H7txRzdCWIlqBdIUkwJhuqV76mqVnJVz4lLHVcmoaOScGA__"
              alt=""
            />
            <button className="card-box-btn">Football</button>
          </div>
          <div className="card-box">
            <img
              src="https://s3-alpha-sig.figma.com/img/6037/a4bb/b2a43655cb0ab4471a3a05e24a0745cd?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SIncTG1Ahc2mTySLEtKpR3dMyULqyhCQf-4vE~SMgRYD9KOQSzi1ZrzHhTCQYLvdUfgz3kMWse7FdEib1VZgAfqGgOwOLJoxiTrCEctMzzEXcfRikQPGd1mbxh-SajsO-5TbhjDW~1vbLJmxUmbq~LREjoSYuZBlaqd1xXRRSkMosv0ZEIBXjHk4ne~e5GGx84SpnWtI4EZbznzcVudrlbWKe~LmGWNDgzrgSqpF5q6r6jVAdQh5uq9VvhHS1IDGI2E~S93mA~U4g3YsTWkdMeC2t8bjEGhO9i3pmF96H7txRzdCWIlqBdIUkwJhuqV76mqVnJVz4lLHVcmoaOScGA__"
              alt=""
            />
            <button className="card-box-btn">Football</button>
          </div>
          <div className="card-box">
            <img
              src="https://s3-alpha-sig.figma.com/img/6037/a4bb/b2a43655cb0ab4471a3a05e24a0745cd?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SIncTG1Ahc2mTySLEtKpR3dMyULqyhCQf-4vE~SMgRYD9KOQSzi1ZrzHhTCQYLvdUfgz3kMWse7FdEib1VZgAfqGgOwOLJoxiTrCEctMzzEXcfRikQPGd1mbxh-SajsO-5TbhjDW~1vbLJmxUmbq~LREjoSYuZBlaqd1xXRRSkMosv0ZEIBXjHk4ne~e5GGx84SpnWtI4EZbznzcVudrlbWKe~LmGWNDgzrgSqpF5q6r6jVAdQh5uq9VvhHS1IDGI2E~S93mA~U4g3YsTWkdMeC2t8bjEGhO9i3pmF96H7txRzdCWIlqBdIUkwJhuqV76mqVnJVz4lLHVcmoaOScGA__"
              alt=""
            />
            <button className="card-box-btn">Football</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopActivites;
