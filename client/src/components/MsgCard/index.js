import React from "react";

function MsgCard(props) {

  return (
    <div className="card bg-dark text-light mb-3">
      <div className="card-header pl-3 m-0 py-2">
        From <a href={"../../profiles/" + props.from} className="text-light"><strong>{props.sender}</strong></a>:
        </div>
      <div className="card-body p-3">
        <p className="m-0">{props.message}</p>
      </div>
      <div className="card-footer p-0">
        <button className="btn btn-clear text-light" onClick={() => props.handleReply(props.from)}>Reply</button>
        <button className="btn btn-clear text-light" onClick={() => props.handleDelete(props.id)}>Delete</button>
      </div>
    </div>
  )
}

export default MsgCard