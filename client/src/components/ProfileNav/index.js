import React from "react";

function Nav(props) {
  return (
    <ul className="list-group mb-3">
      {props.links.map(link => {
        if (link.name === props.active) {
          return (
            <li className="list-group-item bg-info p-0" key={link.name}>
              <button className="btn btn-clear text-light w-100 text-left" onClick={() => props.handleClick(link.name)}>{link.name}</button>
            </li>
          )
        } else {
          return (
            <li className="list-group-item bg-secondary p-0" key={link.name}>
              <button className="btn btn-clear text-light w-100 text-left" onClick={() => props.handleClick(link.name)}>{link.name}</button>
            </li>
          )
        }
      })}
    </ul>
  );
}

export default Nav;
