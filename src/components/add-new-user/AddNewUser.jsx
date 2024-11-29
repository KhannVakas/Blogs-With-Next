"use client";

import { addNewUserAction, editUserAction } from "@/actions";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addNewUserFormControls,
  addNewUserFormInitialState,
} from "@/utils/addNewUserFormControls";
import { useContext, useState } from "react";
import { UserContext } from "@/context";

const AddNewUser = () => {
  const {
    openPopup,
    setOpenPopup,
    addNewUserFormData,
    setAddNewUserFormData,
    currentEditedID,
    setCurrentEditedID,
  } = useContext(UserContext);
  console.log(addNewUserFormData);

  const handleSaveButtonValid = () => {
    return Object.keys(addNewUserFormData).every(
      (key) => addNewUserFormData[key].trim() !== ""
    );
  };

  async function handleAddNewUserAction() {
    const result =
      currentEditedID !== null
        ? await editUserAction(
            currentEditedID,
            addNewUserFormData,
            "/user-management"
          )
        : await addNewUserAction(addNewUserFormData, "/user-management");
    console.log(result);
    setOpenPopup(false);
    setAddNewUserFormData(addNewUserFormInitialState);
    setCurrentEditedID(null);
  }
  return (
    <div>
      <Button onClick={() => setOpenPopup(true)}>Add New User</Button>
      <Dialog
        open={openPopup}
        onOpenChange={() => {
          setOpenPopup(false);
          setAddNewUserFormData(addNewUserFormInitialState);
          setCurrentEditedID(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedID !== null ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>
          <form action={handleAddNewUserAction} className="grid gap-4 py-4">
            <div className="">
              {addNewUserFormControls.map((controlItem) => (
                <div className="mb-5" key={controlItem.name}>
                  <Label htmlFor={controlItem.name} className="text-right mb-5">
                    {controlItem.label}
                  </Label>
                  <Input
                    id={controlItem.name}
                    name={controlItem.name}
                    placeholder={controlItem.placeholder}
                    className="col-span-3 mt-3"
                    type={controlItem.type}
                    value={addNewUserFormData[controlItem.name]}
                    onChange={(event) =>
                      setAddNewUserFormData({
                        ...addNewUserFormData,
                        [controlItem.name]: event.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className={""}
                disabled={!handleSaveButtonValid()}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewUser;
