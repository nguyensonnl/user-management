const ListUser = (props: any) => {
  const { users, onDelete, onUpdate } = props;

  const handleDelete = (idUser: any) => {
    onDelete(idUser);
  };

  const handleUpdate = (idUser: any) => {
    onUpdate(idUser);
  };
  return (
    <div className="list__user">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>CreatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((item: any, index: any) => (
              <tr key={index}>
                <>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.Group?.name}</td>
                  <td>{item.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdate(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delele
                    </button>
                  </td>
                </>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
