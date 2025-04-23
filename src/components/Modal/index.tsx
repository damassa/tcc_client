import React, { useState } from "react";
// import { Modal as ModalForm, Form } from 'react-bootstrap';
import "./style.css";

interface ModalProps {
  show: boolean;
  handleSubmit: (formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  handleClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, handleSubmit }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ name, email, password, confirmPassword });
    handleClose();
  };

  return <div>hehehe</div>;
  // <ModalForm show={show} onHide={handleClose}>
  //   <ModalForm.Header className="modal-dark" closeButton>
  //     <ModalForm.Title className="text-center">Editar dados do usuário</ModalForm.Title>
  //   </ModalForm.Header>
  //   <ModalForm.Body className="modal-dark">
  //     <Form onSubmit={onSubmit}>
  //       <Form.Group className="mb-3" controlId="formName">
  //         <Form.Control
  //           type="text"
  //           placeholder="Nome:"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //           required
  //         />
  //       </Form.Group>
  //       <Form.Group className="mb-3" controlId="formEmail">
  //         <Form.Control
  //           type="email"
  //           placeholder="E-mail:"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //       </Form.Group>
  //       <Form.Group className="mb-3" controlId="formPassword">
  //         <Form.Control
  //           type="password"
  //           placeholder="Senha:"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </Form.Group>
  //       <Form.Group className="mb-3" controlId="formConfirmPassword">
  //         <Form.Control
  //           type="password"
  //           placeholder="Confirme sua senha:"
  //           value={confirmPassword}
  //           onChange={(e) => setConfirmPassword(e.target.value)}
  //           required
  //         />
  //       </Form.Group>
  //       <div className="form-buttons">
  //         <button
  //           type="button"
  //           className="btn btn-primary btn-standard text-black text-uppercase"
  //         >
  //           Salvar dados
  //         </button>
  //         <button
  //           type="button"
  //           className="btn btn-secondary btn-cancel text-black text-uppercase"
  //         >
  //           Cancelar
  //         </button>
  //       </div>
  //     </Form>
  //   </ModalForm.Body>
  // </ModalForm>
  // );
};

export default Modal;
