import { Connect } from "@/db/dbConfig"; // Database connection function
import User from "@/model/userModel"; // User schema
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken"; // Token helper

// Connect to the database
Connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request); // Get user data from token

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized access" },
                { status: 401 }
            );
        }

        // Find all users in the database
        const users = await User.find({}).select("-password");

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}



//update user
export async function PUT(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request); // Get user data from token

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized access" },
                { status: 401 }
            );
        }

        // Find all users in the database
        const users = await User.find({}).select("-password");

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
