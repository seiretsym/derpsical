import React from "react";

function Nav() {
    return (
        <ul className="nav bg-secondary text-light rounded">
            <li className="nav-item">
                <a className="nav-link text-light" href="#">Active</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-light" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-light" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-light" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
        </ul>
    );
}

export default Nav;
