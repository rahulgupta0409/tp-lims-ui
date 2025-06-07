import React, { useCallback, useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import "./style.scss";
import { Button } from "@mui/material";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: any;
  secondaryActionLabel?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled = false,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => onClose(), 300);
  }, [disabled, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${showModal ? "open" : "closed"}`}>
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <Button className="modal-close" onClick={handleClose}>
              <Close sx={{fontSize: 18}} />
            </Button>
          </div>

          {/* Body */}
          <div className="modal-body">{body}</div>

          {/* Footer */}
          <div className="modal-footer">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;