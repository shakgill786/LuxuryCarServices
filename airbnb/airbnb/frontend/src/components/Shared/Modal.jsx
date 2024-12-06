import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
  const [content, setContent] = React.useState(null);

  return (
    <ModalContext.Provider value={{ content, setContent }}>
      {children}
      {content &&
        ReactDOM.createPortal(
          <div className="modal">
            <div className="modal-overlay" onClick={() => setContent(null)} />
            <div className="modal-content">{content}</div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);