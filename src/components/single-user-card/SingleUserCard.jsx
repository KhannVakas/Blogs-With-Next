"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { deleteUserAction, editUserAction } from "@/actions";
import { useContext } from "react";
import { UserContext } from "@/context";

const SingleUserCard = ({ user }) => {
  const { setOpenPopup, setAddNewUserFormData, setCurrentEditedID } =
    useContext(UserContext);

  const handleDelete = async (getCurrentUserID) => {
    const result = await deleteUserAction(getCurrentUserID, "/user-management");
    console.log(result);
  };
  const handleUpdate = async (getCurrentUser) => {
    setOpenPopup(true);
    setAddNewUserFormData({
      firstName: getCurrentUser?.firstName,
      lastName: getCurrentUser?.lastName,
      email: getCurrentUser?.email,
      address: getCurrentUser?.address,
    });
    setCurrentEditedID(getCurrentUser?._id);
  };
  return (
    <Card className={"border-2"}>
      <CardHeader>
        <CardTitle>
          {user?.firstName} {user?.lastName}
        </CardTitle>
        <CardDescription>{user?.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{user?.address}</p>
      </CardContent>
      <CardFooter className={"flex justify-between"}>
        <Button onClick={() => handleUpdate(user)}>Edit</Button>
        <Button onClick={() => handleDelete(user?._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default SingleUserCard;
