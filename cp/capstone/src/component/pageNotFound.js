import React from "react";

const PageNotFound = () => {
  return (
    <div>
      <section className="notFound">
        <div className="img">
          <img
            src="https://assets.codepen.io/5647096/Delorean.png"
            alt="El Delorean, El Doc y Marti McFly"
          />
        </div>
        <div>
          <h1 style={{color:"black"}}>404</h1>
          <h2 style={{color:"black"}}>Page Not Found</h2>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
