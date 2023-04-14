import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import MediaItem from "../MediaItem/MediaItem";

export default function Home() {
  const [IsMovie, setIsMovie] = useState([]);
  const [IsShow, setIsShow] = useState([]);
  const [IsPeople, setIsPeople] = useState([]);

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=462059d15e13b157ed737763f4c41ead`
    );
    callback(data.results);
    console.log(data.results);
  }
  useEffect(() => {
    getTrending("movie", setIsMovie);
    getTrending("person", setIsPeople);
    getTrending("tv", setIsShow);
  }, []);

  return (
    <>
      {IsMovie? <>
        <div className="row py-3">
          <div className=" col-md-4 d-flex align-items-center">
            <div>
              <div className="brdr w-25 mb-3"></div>
              <h2 className=" h3">
                trending <br /> movie <br /> to watch now{" "}
              </h2>
              <p className=" text-muted">most watched movies by week</p>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {IsMovie.slice(0, 10).map((item, index) => (
            <MediaItem key={index} item={item}></MediaItem>
          ))}
        </div>

        <div className="row py-3">
          <div className=" col-md-4 d-flex align-items-center">
            <div>
              <div className="brdr w-25 mb-3"></div>
              <h2 className=" h3">
                trending <br /> tv <br /> to watch now{" "}
              </h2>
              <p className=" text-muted">most watched tvs by week</p>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {IsShow.slice(0, 10).map((item, index) => (
            <MediaItem key={index} item={item}></MediaItem>
          ))}
        </div>

        <div className="row py-3">
          <div className=" col-md-4 d-flex align-items-center">
            <div>
              <div className="brdr w-25 mb-3"></div>
              <h2 className=" h3">
                trending <br /> people <br /> to watch now{" "}
              </h2>
              <p className=" text-muted">most watched peaple by week</p>
              <div className="brdr w-100 mt-3"></div>
            </div>
          </div>
          {IsPeople.slice(0, 10).map((item, index) => (
            <MediaItem key={index} item={item}></MediaItem>
          ))}
        </div>
      </>: <div className=" d-flex align-items-center justify-content-center vh-100">
<i className=" fas fa-spinner fa-spin fa-8x"></i>


      </div> }
     
    </>
  );
}
