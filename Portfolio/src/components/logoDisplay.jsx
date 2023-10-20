import "../assets/logoDisplay.css";

export function LogoDisplay(props) {
  return (
    <div className="logo-display">
      {props.images
        ? props.images.map((image) => {
            return (
              <div key={image}>
                <img
                  src={`../src/assets/images/logos/${image}.svg`}
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
