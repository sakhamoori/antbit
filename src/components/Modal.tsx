import { Button } from "flowbite-react";

type ModalProps = {
  handleClose: any;
  show: boolean;
  children: any;
};

const Modal = ({ handleClose, show, children }: ModalProps) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <Button
          className="text-right"
          color="dark"
          type="button"
          onClick={handleClose}
        >
          Close
        </Button>
      </section>
    </div>
  );
};

export default Modal;