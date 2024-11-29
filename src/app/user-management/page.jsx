import { fetchUsersAction } from "@/actions";
import AddNewUser from "@/components/add-new-user/AddNewUser";
import SingleUserCard from "@/components/single-user-card/SingleUserCard";
import React from "react";

const UserManagement = async () => {
  const getListOfUsers = await fetchUsersAction();

  console.log(getListOfUsers);

  return (
    <div className="p-20 max-w-6xl ">
      <div className="flex justify-between">
        <h1>User Management</h1>
        <AddNewUser />
      </div>
      <div className="mt-6 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {getListOfUsers &&
        getListOfUsers.data &&
        getListOfUsers.data.length > 0 ? (
          getListOfUsers.data.map((userItem) => (
            <SingleUserCard user={userItem} />
          ))
        ) : (
          <h3>No user found! Please Create One</h3>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
