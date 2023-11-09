```typescript
const initState = { url: "", description: "", isValidUrl: true };
//const childRef = useRef();

const [listChild, setListChild] = useState({
  //child1: { url: "", description: "", isValidUrl: true },
  child1: initState,
});

const handleChangeInput = (name: any, value: any, key: any) => {
  let cloneObj: any = { ...listChild };

  cloneObj[key][name] = value;

  if (value && name === "url") {
    cloneObj[key]["isValidUrl"] = true;
  }

  setListChild(cloneObj);
};

const handleAdd = () => {
  let newState = { ...initState };
  let cloneObj: any = { ...listChild };
  cloneObj[`child-${uuidv4()}`] = newState;
  setListChild(cloneObj);
};

const handleDelete = (key: any) => {
  let cloneObj: any = { ...listChild };
  delete cloneObj[key];
  setListChild(cloneObj);
};

const buildDataPersist = () => {
  let cloneObj: any = { ...listChild };
  let result: any = [];
  Object.entries(cloneObj).map(([key, child]: any, index) => {
    result.push({
      url: child.url,
      description: child.description,
    });
  });
  return result;
};

const handleSubmit = async () => {
  // const cloneObj: any = { ...listChild };
  // const newArr = Object.values(cloneObj);

  //check empty
  let invalidObj = Object.entries(listChild).find(([key, child], index) => {
    return child && !child.url;
  });

  //check persist
  if (!invalidObj) {
    let data = buildDataPersist();
    const res: any = await roleService.createRole(data);
    if (res && res.EC === 0) {
      alert("Successfull");

      window.location.reload();
    }
  } else {
    let cloneObj: any = { ...listChild };
    let key = invalidObj[0];
    cloneObj[key]["isValidUrl"] = false;
    setListChild(cloneObj);
  }
};

<div className="permission__container">
  <div className="permission__header">
    <h3>Add new Permission</h3>
    <button className="add" onClick={() => handleAdd()}>
      Add
    </button>
  </div>

  <div className="permission__content">
    {Object.entries(listChild).map(([key, child]) => {
      return (
        <div className="permission__group" key={`child-${key}`}>
          <div className="permission__child">
            <label>URL:</label>
            <input
              onChange={(e) => handleChangeInput("url", e.target.value, key)}
              type="text"
              placeholder="user/read"
              value={child.url}
              className={child.isValidUrl ? "a" : "is-invalid"}
            />
          </div>
          <div className="permission__child">
            <label>Description:</label>
            <input
              type="text"
              placeholder="Có quyền được xem"
              value={child.description}
              onChange={(e) =>
                handleChangeInput("description", e.target.value, key)
              }
            />
          </div>

          <button className="delete" onClick={() => handleDelete(key)}>
            -
          </button>
        </div>
      );
    })}
  </div>
  <button type="button" className="save" onClick={() => handleSubmit()}>
    Save
  </button>
</div>;
```
