import { useState, useEffect, useRef } from "react";
import Layout from "../Layout";
import "./Permission.scss";
import { v4 as uuidv4 } from "uuid";
import { Modal, Button } from "react-bootstrap";

import roleService from "../../api/roleService";
import ViewPermission from "./components/ViewPermission";
import CreatePermission from "./components/CreatePermission";

const Permission = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [listPermission, setListPermission] = useState([]);

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const res = await roleService.getAllRole();
        setListPermission(res.DT);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPermission();
  }, []);

  const handleCreate = async (data: any) => {
    try {
      const res = await roleService.createRole(data);
      console.log(res);
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
