import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import roleService from "../../../api/roleService";

interface IProps {
  openModal: boolean;
  handleClose: () => void;
  permissionsGroupByModule?: any;
  handleSubmit: () => void;
  roleId?: any;
}

const ModalRole = (props: IProps) => {
  const {
    openModal,
    handleClose,
    permissionsGroupByModule,
    handleSubmit,
    roleId,
  } = props;

  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await roleService.getRolesByGroup(roleId);
        setInputValue({
          name: res.DT.name,
          description: res.DT.description,
        });
      } catch (error) {
        console.log();
      }
    };
    fetchData();
  }, [roleId]);

  const handleChangeInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <>
      <Modal show={openModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thêm vai trò</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form__group1">
            <label>
              <span>*</span> Tên vai trò
            </label>
            <input
              value={inputValue.name}
              onChange={(e) => handleChangeInput(e)}
              type="text"
              placeholder="Tên vai trò"
              className="item__input"
              name="name"
            />
          </div>
          <div className="form__group1">
            <label>
              <span>*</span> Miêu tả
            </label>
            <input
              value={inputValue.description}
              onChange={(e) => handleChangeInput(e)}
              name="description"
              type="text"
              placeholder="Miêu tả"
              className="item__input"
            />
          </div>
          <div>
            <div className="module__list">
              <h3>Danh sách các quyền của vai trò</h3>
              <div>
                <input type="checkbox" />
                <span> Check all</span>
              </div>
            </div>

            {permissionsGroupByModule &&
              permissionsGroupByModule.length > 0 &&
              permissionsGroupByModule.map((item: any, index: any) => (
                <div className="modules" key={index}>
                  <div className="modules__heading">
                    <h4>{item.module}</h4>
                    <div>
                      <input type="checkbox" />
                      <span> Check all</span>
                    </div>
                  </div>

                  <div className="modules__content">
                    {item.permissions &&
                      item.permissions?.length > 0 &&
                      item.permissions?.map((item: any, index: any) => (
                        <div className="item__module" key={index}>
                          <input type="checkbox" checked={item.isAssigned} />
                          <div>{item.url}</div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRole;
