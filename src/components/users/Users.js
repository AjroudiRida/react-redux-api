import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/features/users/usersSlice";
import { useEffect } from "react";

const Users = () => {
  const { users, isLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers("users"));
  },[])

  if (isLoading && error === "") {
    return <div>Loading ....</div>;
  } else if (!isLoading && error !== "") {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <ul>
      {users.map((user) => {
        return (
          <li key={user.login.username}>
            {user.name.first} {user.name.last}
          </li>
        );
      })}
    </ul>
  );
}

export default Users;
