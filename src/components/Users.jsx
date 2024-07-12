import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../api/shopApiSlice";
import Loading from "./state/Loading";

const Users = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isFetching,
    isError,
  } = useGetUsersQuery(undefined, {
    refetchOnFocus: true,
  });

  if (isFetching) {
    return <Loading item={"Users "} />;
  }

  if (isError) {
    return <h1>{JSON.stringify(users.error)}</h1>;
  }

  if (!users.length) {
    return <h1>No Users found.</h1>;
  }

  return (
    <div className="bg-BG h-screen">
      <h1 className="text-4xl font-semibold py-4">Users</h1>

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(users) &&
          users.map((user) => (
            <li
              key={user.id}
              onClick={() => navigate(`/user/${user.id}`)}
              className="px-3 py-5 bg-[#fcfcfc] drop-shadow-md"
            >
              <div>
                <p>Email: {user.email}</p>
                <p>Street: {user.address.street}</p>
                <p>
                  Location:{" "}
                  {user.address.geolocation.lat +
                    " , " +
                    user.address.geolocation.long}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
