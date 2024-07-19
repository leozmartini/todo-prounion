import { useState } from "react";
import {
  ModalBackground,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalInput,
  ModalButton,
} from "./styles";
import CustomButton from "../CustomButton/CustomButton";

interface ModalProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttoncolor?: string;
  input1?: string;
  input2?: string;
  onClose: () => void;
  onConfirm: (input1Value?: string, input2Value?: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  buttonText,
  buttoncolor,
  input1,
  input2,
  onClose,
  onConfirm,
}) => {
  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");

  const handleConfirm = () => {
    onConfirm(input1Value, input2Value);
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CustomButton onClick={onClose} text="X" color="red" />
        </ModalHeader>
        <ModalDescription>{description}</ModalDescription>
        <ModalBody>
          {input1 && (
            <ModalInput
              type="text"
              placeholder={input1}
              value={input1Value}
              onChange={e => setInput1Value(e.target.value)}
            />
          )}
          {input2 && (
            <ModalInput
              type="text"
              placeholder={input2}
              value={input2Value}
              onChange={e => setInput2Value(e.target.value)}
            />
          )}
        </ModalBody>
        <ModalButton buttoncolor={buttoncolor} onClick={handleConfirm}>
          {buttonText || "OK"}
        </ModalButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
