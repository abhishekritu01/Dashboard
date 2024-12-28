// pages/api/user/updateuser/[id].ts

import { NextRequest, NextResponse } from "next/server";
import { Connect } from "@/db/dbConfig";
import User from "@/model/userModel";
import { getDataFromToken } from "@/helper/getDataFromToken";

Connect();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    // Fetch user data from token (if necessary)
    const userIdFromToken = await getDataFromToken(request);
    if (!userIdFromToken) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    // Fetch the user by ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Update user information
    const { updateFields } = await request.json();
    if (!updateFields) {
      return NextResponse.json({ success: false, message: "No fields to update" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true }).select("-password");

    return NextResponse.json({ success: true, message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
