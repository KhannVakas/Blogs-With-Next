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

// 4. Delete a user action
