```typescript
const [assignPermissionToRole, setAssignPermissionToRole] = useState([]);
const [selectedGroup, setSelectedGroup] = useState("");
const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

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
const result = groupByPermission(assignPermissionToRole);

//Update action
//Lấy role đã lọc theo group
const buildDataRolesByGroup = (groupRoles: any, allRoles: any) => {
  let result: any = [];
  if (allRoles && allRoles.length > 0) {
    allRoles.map((role: any) => {
      let newObject: any = {};
      newObject.url = role.url;
      newObject.id = role.id;
      newObject.description = role.description;
      newObject.isAssigned = false;
      if (groupRoles && groupRoles.length > 0) {
        newObject.isAssigned = groupRoles.some(
          (item: any) => item.url === newObject.url
        );
      }
      result.push(newObject);
    });
  }
  return result;
};

//Luôn kiểm tra điều kiện đầu vào rồi mới action
//handle select
const handleOnChangeGroup = async (value: any) => {
  setSelectedGroup(value); //id
  if (value) {
    let data = await roleService.getRolesByGroup(value);
    if (data && +data.EC === 0) {
      let result = buildDataRolesByGroup(data.DT.Roles, listPermisison);
      //set lại list role theo group, nếu true thì checked
      setAssignRolesByGroup(result);
    }
  }
};

//how to multiple checkbox
//handle checkbox
const handleSelectRole = (value: any) => {
  const cloneAssignRolesByGroup: any = [...assignRolesByGroup];
  const foundIndex = cloneAssignRolesByGroup.findIndex(
    (item: any) => +item.id === +value
  );

  if (foundIndex > -1) {
    cloneAssignRolesByGroup[foundIndex].isAssigned =
      !cloneAssignRolesByGroup[foundIndex].isAssigned;
  }
  setAssignRolesByGroup(cloneAssignRolesByGroup);
};

//Gán group theo role qua bảng trung gian
const buildDataToSave = () => {
  let result: any = {};
  const cloneAssignRolesByGroup = [...assignRolesByGroup];
  result.groupId = selectedGroup; //id Group
  let groupRolesFilter: any = cloneAssignRolesByGroup.filter(
    (item: any) => item.isAssigned === true
  );
  let finalGroupRoles: any = groupRolesFilter.map((item: any) => {
    let data: any = { groupId: +selectedGroup, roleId: +item.id };
    return data;
  });
  result.groupRoles = finalGroupRoles;
  return result;
// };

const handleSave = async () => {
  try {
    let data = buildDataToSave();
    console.log(data);
    let res = await roleService.assignRolesToGroup(data);
    if (res && res.EC === 0) {
   alert(res.EM);
      window.location.reload();

  } catch (error) {
    console.log(error);
  }
};

/**
   * Tạo mới list permission theo role
   * Tạo mới object thêm thuộc tính isAssigned
   */
  const buildDataPermissionByRole = (
    permissionsByRole: any,
    listPermisison: any
  ) => {
    let result: any = [];
    if (listPermisison && listPermisison.length > 0) {
      listPermisison.map((permisison: any) => {
        let newObject: any = {};
        newObject.url = permisison.url;
        newObject.id = permisison.id;
        newObject.module = permisison.module;
        newObject.description = permisison.description;
        newObject.isAssigned = false;
        if (permissionsByRole && permissionsByRole.length > 0) {
          newObject.isAssigned = permissionsByRole.some(
            (item: any) => item.url === newObject.url
          );
        }
        result.push(newObject);
      });
    }
    return result;
  };
```

```typescript
{
  /*  
        <h3>List group</h3>
        <select
          style={{ width: "30%", marginBottom: "10px" }}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleOnChangeGroup(+e.target.value)
          }
        >
          <option>Choose role</option>
          {listRole.map((item: any, index) => (
            <option key={`group-${index}`} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {selectedGroup && (
          <div className="perrmission__container">
            <h3>Assign Role</h3>
            <div className="list__permission">
              {assignRolesByGroup &&
                assignRolesByGroup.length > 0 &&
                assignRolesByGroup.map((item: any, index) => (
                  <div
                    className="permission__content"
                    key={index}
                    style={{ fontSize: "18px" }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        marginRight: "6px",
                        width: "18px",
                        height: "18px",
                      }}
                      value={item.id}
                      checked={item.isAssigned}
                      onChange={(e) => handleSelectRole(e.target.value)}
                    />
                    <span>{item.url}</span>
                  </div>
                ))}
            </div>

            <button
              style={{
                outline: "none",
                border: "1px solid yellow",
                padding: "3px 10px",
                backgroundColor: "yellow",
              }}
              onClick={() => handleSave()}
            >
              Save
            </button>
          </div>
        )}
        */
}
```

```typescript
const handleUpdate = async (roleId: any) => {
  setRoleId(roleId);
  try {
    const res = await roleService.getRolesByGroup(roleId);
    if (res && +res.EC === 0) {
      let result = buildDataPermissionByRole(res.DT?.Roles, listPermisison);
      //setAssignPermissionToRole(result);
    }
  } catch (error) {
    console.log(error);
  }
  setOpenModal(true);
};
```
