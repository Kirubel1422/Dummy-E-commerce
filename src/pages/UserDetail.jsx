import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDeleteUserMutation, useGetUserQuery } from "../api/shopApiSlice";
import Loading from "../components/state/Loading";
import { Button } from "antd";

const UserDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    data: user,
    isFetching,
    isError,
  } = useGetUserQuery({ id: params.userId });
  const [deleteUser, { isLoading, isError: isDeleteError }] =
    useDeleteUserMutation({ id: params.userId });

  if (isFetching) {
    return <Loading item={"User id: " + params.userId} />;
  }

  if (isError) {
    return <h1>{JSON.stringify(user.error)}</h1>;
  }

  if (!user) {
    return <h1>No User found.</h1>;
  }
  return (
    <div className="bg-BG h-screen">
      <h1 className="text-4xl font-semibold text-start">
        User: {params.userId}
      </h1>

      <div className="mt-10 p-5 bg-[#fcfcfc]">
        <h2 className="text-2xl text-neutral-600">
          <span>Email</span>: {user.email}
        </h2>
        <p className="mt-4">
          <h3 className="font-semibold text-neutral-700 text-xl">Address</h3>
          <ul className="mt-1 border p-2 bg-[#fff] shadow">
            <li className="text- text-neutral-600">
              City: {user.address.city}
            </li>
            <li className="text-lg text-neutral-600">
              Street: {user.address.street}
            </li>
            <li className="text-lg text-neutral-600">
              Long: {user.address.geolocation.long}
            </li>
            <li className="text-lg text-neutral-600">
              Lat: {user.address.geolocation.lat}
            </li>
            <li className="text-lg text-neutral-600">
              Zipcode: {user.address.zipcode}
            </li>
          </ul>
        </p>

        <p className="mt-3">
          <Button
            disabled={isLoading}
            onClick={async () => {
              deleteUser({ id: params.userId }).then(() => navigate("/"));
            }}
            className="bg-pink-600 text-white disabled:bg-neutral-400 disabled:cursor-not-allowed"
          >
            Delete User
          </Button>
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
