import React from "react";
import Moment from "react-moment";

function SongCard(props) {
  return (
    <div className="card bg-dark text-light mb-3 mx-3 p-3 card-song" key={props.title}>
      <div className="card-title">
        <a href={"../songs/" + props.id}>
          <img src="../../../logo256.png" alt={props.title} />
        </a>
      </div>
      <div className="card-body m-0 p-0">
        <strong><a href={"../songs/" + props.id} className="text-light">{props.title}</a></strong><br />
        by <a href={"../profiles/" + props.cid} className="text-light">{props.displayname}</a><br />
        Derped @ <Moment format="MM/DD/YYYY - h:mma">{props.created}</Moment>
      </div>
    </div>
  )
}

export default SongCard