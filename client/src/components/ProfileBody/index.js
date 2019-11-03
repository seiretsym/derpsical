import React from "react";

function ProfileBody(props) {

  // function that decides which view to show
  const showPage = () => {
    // get view from props
    switch (props.view) {
      case "Profile":
        return (
          <div>
            <h1>Profile</h1>
            <p>
              Nisi minim eiusmod voluptate commodo ea ea mollit sunt velit. Veniam non dolore amet labore commodo cupidatat nulla esse. Cupidatat ex tempor eiusmod ut. Cillum incididunt aute occaecat cupidatat ipsum cillum tempor voluptate aliqua sint laborum. Enim minim et nostrud dolor ea adipisicing mollit anim nisi eiusmod ullamco in proident nulla. Reprehenderit fugiat ullamco voluptate sit nostrud eiusmod eiusmod labore magna aliqua cillum tempor enim.
            </p>
          </div>
        )
      case "Messages":
        return (
          <div>
            <h1>Messages</h1>
            <p>
              Consectetur eu velit nulla ullamco. Nulla dolore irure cillum nostrud cillum esse ipsum ut commodo qui adipisicing duis. Fugiat sit cupidatat ipsum tempor tempor sunt.
            </p>
          </div>
        )
      case "Songs":
        return (
          <div>
            <h1>Songs</h1>
            <p>
              Commodo pariatur et quis commodo fugiat eiusmod aliqua cillum consectetur. Laboris amet cillum laborum laborum sunt incididunt cupidatat Lorem amet excepteur dolore ipsum. Elit eiusmod ea anim culpa nisi enim deserunt ad ex reprehenderit. Quis Lorem Lorem ipsum sit adipisicing mollit.
            </p>
          </div>
        )
      case "Config":
        return (
          <div>
            <h1>Config</h1>
            <p>
              Dolor anim do tempor dolore incididunt consectetur id exercitation consectetur. Irure ullamco ad sit laboris nisi proident et cillum qui id aute incididunt. Labore nostrud deserunt pariatur nisi cupidatat sint irure ipsum exercitation duis do eu est. Ea incididunt eiusmod aliqua ipsum incididunt incididunt consectetur exercitation enim laborum aliquip. Enim cupidatat quis dolor quis velit veniam sit excepteur nisi proident. Dolore reprehenderit minim et exercitation commodo esse nulla. Magna quis tempor duis tempor sint incididunt voluptate dolore eu.
            </p>
          </div>
        )
      default:
        return (
          <div>
            <h1>Default</h1>
            <p>If you somehow got here, you should talk to Kevin.</p>
          </div>
        )
    }
  }

  return (
    <div className="bg-secondary rounded p-3">
      {showPage()}
    </div>
  )
}

export default ProfileBody;
