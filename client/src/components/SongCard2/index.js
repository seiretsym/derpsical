import React from "react";

function SongCard2(props) {
  return (
    <div className="card bg-dark text-light mb-3 mx-3 p-3 card-song" key={props.title}>
      <div className="card-header p-0">
        <a href={"../songs/" + props.id}>
          <img src="../../../logo256.png" alt={props.title} />
        </a>
      </div>
      <div className="card-body m-0 p-0">
        <strong><a href={"../songs/" + props.id} className="text-light">{props.title}</a></strong><br />
      </div>
      <div className="card-footer m-0 p-0">
        <button className="btn btn-clear text-light" onClick={() => props.handleEdit(props.id)}>Edit</button>
        <button className="btn btn-clear text-light" onClick={() => props.handleDelete(props.id)}>Delete</button>
      </div>
    </div>
  )
}

export default SongCard2