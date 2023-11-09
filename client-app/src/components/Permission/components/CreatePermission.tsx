import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { modules } from "../../../constants/modules";

interface IProps {
  openModal: boolean;
  setOpenModal: () => void;
  onCreate: any;
}
const CreatePermission = (props: IProps) => {
  const { openModal, setOpenModal, onCreate } = props;

  const [url, setUrl] = useState<string>("");
  const [des, setDes] = useState<string>("");
  const [selectModule, setSelectModule] = useState<string>("");

  const handleCreate = () => {
    const data = {
      url: url,
      description: des,
      module: selectModule,
    };
    onCreate(data);
  };

  return (
    <Modal
      show={openModal}
      onHide={setOpenModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Tạo mới quyền</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form__group1">
          <label>
            <span>*</span> API
          </label>
          <input
            type="text"
            className="item__input"
            placeholder="API"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="form__group1">
          <label>
            <span>*</span> Miêu tả
          </label>
          <input
            type="text"
            className="item__input"
            placeholder="Miêu tả"
            onChange={(e) => setDes(e.target.value)}
          />
        </div>
        <div className="form__group1">
          <label>
            <span>*</span> Modules
          </label>
          <select
            style={{
              padding: "4px 6px",
              outline: "none",
              border: "1px solid #ccc",
            }}
            onChange={(e) => setSelectModule(e.target.value)}
          >
            <option>Chọn modules</option>
            {Object.entries(modules).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={setOpenModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePermission;
