import axios from "axios";
import { array } from "joi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function People() {
  const [people, setpeople] = useState([]);
  let nums = new Array(10).fill(1).map((element, index) => index + 1);
  async function getPeople(page) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=462059d15e13b157ed737763f4c41ead&language=en-US&page=${page}`  );
      setpeople(data.results);
    console.log(data.results);
  }
  useEffect(() => {
    getPeople(1);
  }, []);

  return (
    <>
      <div className="row">
        {people.map((item, index) => (
          <div key={index} className=" col-md-3">
            <Link
              className=" text-decoration-none text-white"
              to={`/moviedetails/${item.id}/person`}
            >
              <div className=" position-relative">
                {item.poster_path ? (
                  <img
                    className=" w-100"
                    src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                    alt=""
                  />
                ) : (
                  <img
                    className=" w-100"
                    src={"https://image.tmdb.org/t/p/w500" + item.profile_path}
                    alt=""
                  />
                )}

                <h3 className=" h5 text-white">
                  {item.title} {item.name}
                </h3>
                {item.vote_average ? (
                  <div className=" vote top-0 end-0 position-absolute p-1">
                    {item.vote_average.toFixed(1)}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <nav className=" py-5 my-5">
        <ul className=" pagination pagination-sm d-flex justify-content-center">
          {nums.map((page,index)=><li key={index} onClick={()=>getPeople(page)} >
            <Link className=" page-link bg-transparent text-white">{page}</Link>
          </li>)}
          
        </ul>
      </nav>
    </>
  );
}
