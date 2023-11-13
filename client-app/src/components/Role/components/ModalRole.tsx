import { Modal, Button } from "react-bootstrap";
import { useEffect, useState, useMemo } from "react";
import roleService from "../../../api/roleService";
import _ from "lodash";
import groupService from "../../../api/groupService";

/**
 * get listPermission from component parent
 * group by module
 * handle change single chekcbox, multipe checkbox
 * handle submit form
 */
interface IProps {
  openModal: boolean;
  handleClose: () => void;
  roleId?: any;
  listPermission: any;
}

const ModalRole = (props: IProps) => {
  const { openModal, handleClose, roleId, listPermission } = props;
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
  });

  //doing
  const initStateError = {
    isName: "",
    isDescription: "",
  };
  const [errorInput, setErrorInput] = useState(initStateError);
  const [selectedPermisisons, setSelectedPermissions] = useState<any>([]);

  const handleValidaitonInput = () => {
    //setErrorInput(initStateError);

    if (!inputValue.name) {
      setErrorInput({
        isDescription: "",
        isName: "Tên vai trò không được để trống",
      });

      return false;
    }

    if (!inputValue.description) {
      setErrorInput({
        isName: "",
        isDescription: "Miêu tả vai trò không được để trống",
      });
      return false;
    }

    return true;
  };

  const handleChangeCheckbox = (e: any, value: any) => {
    if (e.target.checked) {
      setSelectedPermissions([
        ...selectedPermisisons,
        {
          id: value.id,
          url: value.url,
          module: value.module,
          description: value.description,
        },
      ]);
    } else {
      setSelectedPermissions(
        selectedPermisisons?.filter((item: any) => item.id !== value.id)
      );
    }
  };

  const handleSubmitModal = async () => {
    if (roleId) {
      //update
    } else {
      //create
      const isValid = handleValidaitonInput();

      if (isValid) {
        //create role
        let data: any = {};
        const role = {
          name: inputValue.name,
          description: inputValue.description,
        };
        const res = await groupService.createNewGroup(role);
        if (res && res.DT.id) {
          //get id role
          //assign permision to role
          data.groupId = res.DT.id;
          const permisisonRoleFinal = selectedPermisisons.map((item: any) => {
            let data: any = { groupId: +res.DT.id, roleId: +item.id };
            return data;
          });
          data.groupRoles = permisisonRoleFinal;
        }

        try {
          const res = await roleService.assignRolesToGroup(data);
          if (res && +res.EC === 0) {
            window.location.reload();
          } else {
            alert("Thất bại");
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  /**
   * Handle check all
   */
  const handleSelectedAllPermission = (e: any, data: any) => {
    if (e.target.checked) {
      setSelectedPermissions([...selectedPermisisons, data.permissions].flat());
    } else {
      const result = selectedPermisisons.filter(
        (item: any) => item.module !== data.module
      );
      setSelectedPermissions(result);
      //  setSelectedPermissions(selectedPermisisons.filter((item:any)=> i))
    }
  };

  const handleTotalCheckall = (e: any) => {
    if (e.target.checked) {
      setSelectedPermissions(listPermission);
    } else {
      setSelectedPermissions([]);
    }
  };

  console.log(selectedPermisisons);
  //doing

  //Gom nhóm permisison theo module
  const groupByPermission = (data: any) => {
    return _(data)
      .groupBy((x) => x.module)
      .map((value: any, key: any) => {
        return {
          module: key,
          permissions: value,
        };
      })
      .value();
  };

  const resultPermission = useMemo(() => {
    return groupByPermission(listPermission);
  }, [listPermission]);

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
            {errorInput.isName && (
              <div style={{ fontSize: "1.4rem", color: "red" }}>
                {errorInput.isName}
              </div>
            )}
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
            {errorInput.isDescription && (
              <div style={{ fontSize: "1.4rem", color: "red" }}>
                {errorInput.isDescription}
              </div>
            )}
          </div>
          <div>
            <div className="module__list">
              <h3>Danh sách các quyền của vai trò</h3>
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => handleTotalCheckall(e)}
                />
                <span> Check all</span>
              </div>
            </div>

            {resultPermission &&
              resultPermission.length > 0 &&
              resultPermission.map((item: any, index: any) => (
                <div className="modules" key={index}>
                  <div className="modules__heading">
                    <h4>{item.module}</h4>
                    <div>
                      <input
                        type="checkbox"
                        onChange={(e) => handleSelectedAllPermission(e, item)}
                      />
                      <span> Check all</span>
                    </div>
                  </div>

                  <div className="modules__content">
                    {item.permissions &&
                      item.permissions?.length > 0 &&
                      item.permissions?.map((value: any, index: any) => (
                        <div className="item__module" key={index}>
                          <input
                            checked={selectedPermisisons.some(
                              (item: any) => item.id === value.id
                            )}
                            type="checkbox"
                            onChange={(e) => {
                              handleChangeCheckbox(e, value);
                            }}
                          />
                          <div>{value.url}</div>
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
          <Button variant="primary" onClick={() => handleSubmitModal()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRole;
