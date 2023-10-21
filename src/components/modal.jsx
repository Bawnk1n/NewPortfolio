export function Modal({ img, closeModal }) {
  return (
    <div className="modal-background" onClick={closeModal}>
      <img src={img} alt="image modal" className="modal-image"></img>
    </div>
  );
}
