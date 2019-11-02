import React from "react";

function ProfileBody(props) {

  const showPage = () => {
    switch (props.view) {
      case "Profile":
        return (
          <div>
          <h1>Profile</h1>
          <p>
            Pariatur id exercitation eu ad eiusmod sint dolore ipsum culpa voluptate. Ut amet Lorem voluptate cillum ullamco. Excepteur adipisicing eu id laboris eiusmod consectetur labore deserunt commodo reprehenderit nostrud adipisicing deserunt. Eu magna ut excepteur do. Labore cillum dolore consequat culpa. Consequat sint consequat tempor aute laboris elit dolor magna tempor eu occaecat culpa mollit dolor.

Esse labore nostrud cupidatat commodo id non amet quis. Consequat aliquip non aute aliqua quis laboris laborum id eu sit cillum duis pariatur dolore. Ullamco elit exercitation elit tempor aute quis ex. Ipsum dolore nostrud laborum ex nulla enim et. Aute anim tempor ad ullamco laboris do tempor. Enim ullamco consectetur nisi aliqua fugiat ipsum voluptate.
          </p>
          </div>
              )
      case "Messages":
        return (
          <div>
          <h1>Messages</h1>
          <p>
            Pariatur id exercitation eu ad eiusmod sint dolore ipsum culpa voluptate. Ut amet Lorem voluptate cillum ullamco. Excepteur adipisicing eu id laboris eiusmod consectetur labore deserunt commodo reprehenderit nostrud adipisicing deserunt. Eu magna ut excepteur do. Labore cillum dolore consequat culpa. Consequat sint consequat tempor aute laboris elit dolor magna tempor eu occaecat culpa mollit dolor.

Esse labore nostrud cupidatat commodo id non amet quis. Consequat aliquip non aute aliqua quis laboris laborum id eu sit cillum duis pariatur dolore. Ullamco elit exercitation elit tempor aute quis ex. Ipsum dolore nostrud laborum ex nulla enim et. Aute anim tempor ad ullamco laboris do tempor. Enim ullamco consectetur nisi aliqua fugiat ipsum voluptate.
          </p>
          </div>
        )
      case "Songs":
        return (
          <div>
          <h1>Songs</h1>
          <p>
            Pariatur id exercitation eu ad eiusmod sint dolore ipsum culpa voluptate. Ut amet Lorem voluptate cillum ullamco. Excepteur adipisicing eu id laboris eiusmod consectetur labore deserunt commodo reprehenderit nostrud adipisicing deserunt. Eu magna ut excepteur do. Labore cillum dolore consequat culpa. Consequat sint consequat tempor aute laboris elit dolor magna tempor eu occaecat culpa mollit dolor.

Esse labore nostrud cupidatat commodo id non amet quis. Consequat aliquip non aute aliqua quis laboris laborum id eu sit cillum duis pariatur dolore. Ullamco elit exercitation elit tempor aute quis ex. Ipsum dolore nostrud laborum ex nulla enim et. Aute anim tempor ad ullamco laboris do tempor. Enim ullamco consectetur nisi aliqua fugiat ipsum voluptate.
          </p>
          </div>
        )
      case "Config":
        return (
          <div>
          <h1>Config</h1>
          <p>
            Pariatur id exercitation eu ad eiusmod sint dolore ipsum culpa voluptate. Ut amet Lorem voluptate cillum ullamco. Excepteur adipisicing eu id laboris eiusmod consectetur labore deserunt commodo reprehenderit nostrud adipisicing deserunt. Eu magna ut excepteur do. Labore cillum dolore consequat culpa. Consequat sint consequat tempor aute laboris elit dolor magna tempor eu occaecat culpa mollit dolor.

Esse labore nostrud cupidatat commodo id non amet quis. Consequat aliquip non aute aliqua quis laboris laborum id eu sit cillum duis pariatur dolore. Ullamco elit exercitation elit tempor aute quis ex. Ipsum dolore nostrud laborum ex nulla enim et. Aute anim tempor ad ullamco laboris do tempor. Enim ullamco consectetur nisi aliqua fugiat ipsum voluptate.
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
    <div className="bg-secondary rounded px-3">
      {showPage()}
    </div>
  )
}

export default ProfileBody;
