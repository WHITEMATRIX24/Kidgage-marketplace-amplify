import React from "react";
import "./detailedBlog.css";

const Detailedblog = () => {
  return (
    <div className="detailedblog-layout">
      <div className="detailedblog-left-container">
        <div className="detailed-blog-image">
          <img
            src="https://s3-alpha-sig.figma.com/img/805d/1f6b/b81629c19ca3ebeb8dc7604d3083c71e?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H68TvoyrrmT6b6rdtMXx7-oKbqxWyn6dIONP6v~53VrcEoDEsMk4SQByByaVViWERB0KhN7n5zC69erup2pBSmw8-Aoo7tCN81FSSPmy96~pXC3LWoldT2gJL41pluCYAvTdUBjQaK0j-B8SL6Ioc86JO71AvEKn-KuU56JgKW9J2mxQjm~yx2hQgtgwRA7kkuaJigMp20puwbbqIaBbpZAYW71CzZDhrU~K3BwOp4p0sNL3U5llPKsCgvS1YKDEKhc00T9kSLC9EF28DqlGkRGjwC6SZSADJEdRRUhg7UBxAcTJbgtuZZw~pqhn4ljv7NeMHV84~aQsHo5SN~AeTw__"
            alt=""
          />
        </div>
        {/* on small screen */}
        <div className="detailedblog-right-container-onSmallscreen">
          <div className="detailedblog-share-btn">
            <button>share</button>
          </div>
          <div className="detailedblog-content-header">
            <h3>Blog name</h3>
            <p>Jan/30/2025</p>
          </div>
          <div className="detailedblog-content">
            <h6>Surprise! We're back with</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              explicabo cumque. Fuga libero, distinctio quasi, necessitatibus
              tempora itaque, mollitia ab voluptates ex sunt odio modi
              accusantium rem non a nemo?Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nobis soluta nemo facere, modi non officiis cum
              omnis molestias? Suscipit est dolores minima quas debitis autem
              ullam quia voluptatum, praesentium delectus. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Fugiat, explicabo cumque. Fuga
              libero, distinctio quasi, necessitatibus tempora itaque, mollitia
              ab voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
              distinctio quasi, necessitatibus tempora itaque, mollitia ab
              voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
              distinctio quasi, necessitatibus tempora itaque, mollitia ab
              voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
              distinctio quasi, necessitatibus tempora itaque, mollitia ab
              voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
              distinctio quasi, necessitatibus tempora itaque, mollitia ab
              voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
              distinctio quasi, necessitatibus tempora itaque, mollitia ab
              voluptates ex sunt odio modi accusantium rem non a nemo?Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nobis soluta
              nemo facere, modi non officiis cum omnis molestias? Suscipit est
              dolores minima quas debitis autem ullam quia voluptatum,
              praesentium delectus.
            </p>
          </div>
        </div>
        {/* ///// */}
        <div className="detailedblog-more-container">
          <div className="detailedblog-moreblog-header">
            <h3>More Blogs</h3>
            <p>Suggested</p>
          </div>
          <div className="detailedblog-more-card-container">
            {[1, 2, 3, 4].map((val) => (
              <div className="detailedblog-card">
                <div className="detailedblog-card-image">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/1c4e/2d8f/bd0bf06dedcc1bbc49a180a3070deaef?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bOAXSEbq-60ulUORYwdusSAXcWdGpJMFhRUAEMikpfhiLKCN1xVRKmssJb6FSznl0JdAoQxtLvBelYnvzstuzKJe68pCd~B823wg4f1oBhRJuZmtpA3tt7kVBzULs5e93qIOq9qcb-s8799RTjfwGssV75EfoEsirWLwQidPW0RmgT8N4GxYAwiEGC9tCg1I7serL1oepmeHFr99HHxS2Bg~RvyTVCGMlfysjqqv4eTtY7e3UumDCbsoULUq1YycQDMz4GXjUsA2yfV0VZ49Vbr9WaeJB1GnnyWxlHrP8C4WZVFjbwm224jrN7vTCyTilVRXO6RDzALSp1QP9RTBSw__"
                    alt=""
                  />
                </div>
                <div className="detailedblog-card-content">
                  <h3>New blog</h3>
                  <p>Jan/30/2025</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="detailedblog-right-container">
        <div className="detailedblog-share-btn">
          <button>share</button>
        </div>
        <div className="detailedblog-content-header">
          <h3>Blog name</h3>
          <p>Jan/30/2025</p>
        </div>
        <div className="detailedblog-content">
          <h6>Surprise! We're back with</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
            explicabo cumque. Fuga libero, distinctio quasi, necessitatibus
            tempora itaque, mollitia ab voluptates ex sunt odio modi accusantium
            rem non a nemo?Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nobis soluta nemo facere, modi non officiis cum omnis
            molestias? Suscipit est dolores minima quas debitis autem ullam quia
            voluptatum, praesentium delectus. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
            distinctio quasi, necessitatibus tempora itaque, mollitia ab
            voluptates ex sunt odio modi accusantium rem non a nemo?Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Nobis soluta nemo
            facere, modi non officiis cum omnis molestias? Suscipit est dolores
            minima quas debitis autem ullam quia voluptatum, praesentium
            delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugiat, explicabo cumque. Fuga libero, distinctio quasi,
            necessitatibus tempora itaque, mollitia ab voluptates ex sunt odio
            modi accusantium rem non a nemo?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nobis soluta nemo facere, modi non
            officiis cum omnis molestias? Suscipit est dolores minima quas
            debitis autem ullam quia voluptatum, praesentium delectus. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Fugiat, explicabo
            cumque. Fuga libero, distinctio quasi, necessitatibus tempora
            itaque, mollitia ab voluptates ex sunt odio modi accusantium rem non
            a nemo?Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nobis soluta nemo facere, modi non officiis cum omnis molestias?
            Suscipit est dolores minima quas debitis autem ullam quia
            voluptatum, praesentium delectus. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Fugiat, explicabo cumque. Fuga libero,
            distinctio quasi, necessitatibus tempora itaque, mollitia ab
            voluptates ex sunt odio modi accusantium rem non a nemo?Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Nobis soluta nemo
            facere, modi non officiis cum omnis molestias? Suscipit est dolores
            minima quas debitis autem ullam quia voluptatum, praesentium
            delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugiat, explicabo cumque. Fuga libero, distinctio quasi,
            necessitatibus tempora itaque, mollitia ab voluptates ex sunt odio
            modi accusantium rem non a nemo?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nobis soluta nemo facere, modi non
            officiis cum omnis molestias? Suscipit est dolores minima quas
            debitis autem ullam quia voluptatum, praesentium delectus. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Fugiat, explicabo
            cumque. Fuga libero, distinctio quasi, necessitatibus tempora
            itaque, mollitia ab voluptates ex sunt odio modi accusantium rem non
            a nemo?Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nobis soluta nemo facere, modi non officiis cum omnis molestias?
            Suscipit est dolores minima quas debitis autem ullam quia
            voluptatum, praesentium delectus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detailedblog;
