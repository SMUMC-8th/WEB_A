import ReactDOM from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  let modalRoot = document.getElementById('modal-root');

  //  없으면 생성해서 body에 append
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  }

  return ReactDOM.createPortal(children, modalRoot);
};

export default Portal;
