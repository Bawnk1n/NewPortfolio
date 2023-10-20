import "../assets/logoDisplay.css";

import logoBootstrap from "/images/logos/bootstrap.svg";

export function LogoDisplay(props) {
  return (
    <div className="logo-display">
      {props.images
        ? props.images.map((image) => {
            return (
              <div key={image}>
                <img
                  src={`../public/images/logos/${image}.svg`}
                  className="logo"
                />
                <p>{image}</p>
              </div>
            );
          })
        : null}
    </div>
  );
}
