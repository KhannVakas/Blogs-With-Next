"use server";

import connectToDB from "@/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

// export async function fetchListOfProducts() {
//   const res = await fetch("https://dummyjson.com/products");
//   const data = await res.json();

//   return data?.products;
// }

// 1. Add new user action

export async function addNewUserAction(formData, pathToRevalidate) {
  await connectToDB();

  try {
    // validate data using Joi / other packages

    const newlyCreatedUser = await User.create(formData);
    if (newlyCreatedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User Added Successfully",
      };
    } else {
      return {
        success: false,
        message: "Some error occured! Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error occured! Please try again",
    };
  }
}

// 2. Fetch user actions

export async function fetchUsersAction() {
  await connectToDB();
  try {
    const listOfUsers = await User.find({});
    if (listOfUsers) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(listOfUsers)),
      };
    } else {
      return {
        success: false,
        message: "Some error occured! Please try again...",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error occured! Please try again...",
    };
  }
}

// 3. Edit a user action

export async function editUserAction(
  currentUserID,
  formData,
  pathToRevalidate
) {
  await connectToDB();
  try {
    const { firstName, lastName, email, address } = formData;

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: currentUserID,
      },
      { firstName, lastName, email, address },
      { new: true }
    );
    if (updatedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User Updated Successfully!",
      };
    } else {
      return {
        success: false,
        message: "Can't update the user. Please Try again..",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something Went wrong! Please try again",
    };
  }
}

// 4. Delete a user action

export async function deleteUserAction(currentUserID, pathToRevalidate) {
  await connectToDB();
  try {
    const deletedUser = await User.findByIdAndDelete(currentUserID);

    if (deletedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User Deleted Sucessfully",
      };
    } else {
      return {
        success: false,
        message: "Not able to perform delete operation! Please Try again..",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong! Please Try again..",
    };
  }
}
