import "./Permission.scss";
import { useState, useEffect, useRef } from "react";
import Layout from "../Layout";
import { Modal, Button } from "react-bootstrap";

import permisisonService from "../../api/permissionService";
import ViewPermission from "./components/ViewPermission";
import CreatePermission from "./components/CreatePermission";

const Permission = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [listPermission, setListPermission] = useState([]);
  const stateRef = useRef<boolean>(false);

  useEffect(() => {
    const fetchPermission = async () => {
      if (stateRef.current === false) {
        stateRef.current = true;
        try {
          const res = await permisisonService.getPermission();
          setListPermission(res.DT);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPermission();
  }, []);

  const handleCreate = async (data: any) => {
    try {
      const res = await permisisonService.createPermission(data);
      if (res && +res.EC === 0) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h3 style={{ marginBottom: "10px" }}>Danh sách permission</h3>

      <Button variant="primary" onClick={() => setOpenModal(true)}>
        Thêm quyền hạn
      </Button>

      <CreatePermission
        openModal={openModal}
        setOpenModal={() => setOpenModal(!openModal)}
        onCreate={handleCreate}
      />

      <ViewPermission permissions={listPermission} />
    </Layout>
  );
};

export default Permission;
