import { useState, useEffect, useContext } from "react";
import { UserContextType, UserContext } from "../../context/UserContext";

interface IProps {
  hideChildren?: boolean;
  children: React.ReactNode;
  permission: { url: string; module: string };
}

const Access = (props: IProps) => {
  const { user } = useContext(UserContext) as UserContextType;
  const { permission, hideChildren = false } = props;
  const [allow, setAllow] = useState<boolean>(false);

  const permissions = user.account.groupWithRoles?.Permissions;

  useEffect(() => {
    if (permissions && permissions.length > 0) {
      const check = permissions.find(
        (item: any) =>
          item.url === permission.url && item.module === permission.module
      );

      if (check) {
        setAllow(true);
      } else {
        setAllow(false);
      }
    }
  }, [permissions]);

  return (
    <>
      {allow === true ? (
        <>{props.children}</>
      ) : (
        <>
          {hideChildren === false ? (
            <div>Bạn không có quyền truy cập thông tin này</div>
          ) : (
            <>{/* render nothing */}</>
          )}
        </>
      )}
    </>
  );
};

export default Access;
