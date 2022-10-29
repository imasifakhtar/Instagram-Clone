import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setPics(result.mypost);
      });
  }, []);

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            alt="alt-text"
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ? state.pic : "loading"}
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <div
              style={{
                textAlign: "center",
                lineHeight: "1px",
                paddingLeft: "20px",
              }}
            >
              <h6>{mypics.length}</h6>
              <p>Posts</p>
            </div>
            <div
              style={{
                textAlign: "center",
                lineHeight: "1px",
                paddingLeft: "20px",
              }}
            >
              <h6>{state ? state.followers.length : "0"}</h6>
              <p>Followers</p>
            </div>
            <div
              style={{
                textAlign: "center",
                lineHeight: "1px",
                paddingLeft: "20px",
              }}
            >
              <h6>{state ? state.following.length : "0"}</h6>
              <p>Following</p>
            </div>
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return <img alt="alt-text" src={item.photo} key={item._id} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
