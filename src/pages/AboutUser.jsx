import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../api";

export function AboutUser() {
  let { userID } = useParams();
  console.log(userID);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(userID),
  });

  if (isLoading) {
    return <CircularProgress color="secondary" className="loader" />;
  }

  if (isError) {
    return <p className="error">{error.message}</p>;
  }

  return (
    <div className="userWindow">
      <div className="userWindow__content">
        <div
          className="userWindow__content-avatar"
          style={{ backgroundImage: `url(${user.avatar})` }}
        ></div>
        <div>
          <h1>{user.name} </h1>
          <p> {user.about} </p>
        </div>
      </div>
    </div>
  );
}
