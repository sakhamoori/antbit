/* eslint-disable import/no-extraneous-dependencies */
import { Button } from 'flowbite-react';

type ModalProps = {
  handleClose: any;
  show: boolean;
  children: any;
};

const Modal = ({ handleClose, show, children }: ModalProps) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={`${showHideClassName} `}>
      <section className="modal-main">
        <div>{children}</div>
        <div className="my-3 flex items-center justify-center">
          <Button color="dark" type="button" onClick={handleClose}>
            Close
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
