import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"
import { queryRow, executeQuery } from "@/lib/database"

interface RouteParams {
  params: Promise<{ id: string; updateId: string }>
}

const UpdateUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).max(5000).optional(),
  version: z.string().max(50).optional(),
  update_type: z.enum(["feature", "bugfix", "breaking", "security", "other"]).optional(),
  is_major: z.boolean().optional()
})

// GET - Fetch specific update
export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id: productId, updateId } = await params

    // Fetch update with product info
    const update = await queryRow(
      `SELECT 
        pu.id, pu.title, pu.content, pu.version, pu.update_type, 
        pu.is_major, pu.created_at,
        p.id as product_id, p.name as product_name, p.submitter_id
       FROM product_updates pu
       JOIN products p ON pu.product_id = p.id
       WHERE pu.id = ? AND pu.product_id = ?`,
      [updateId, productId]
    )

    if (!update) {
      return NextResponse.json(
        { error: "Update not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ update })

  } catch (error) {
    console.error("Failed to fetch update:", error)
    return NextResponse.json(
      { error: "Failed to fetch update" },
      { status: 500 }
    )
  }
}

// PUT - Update existing update
export async function PUT(
  request: Request,
  { params }: RouteParams
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const { id: productId, updateId } = await params
    const body = await request.json()
    const validatedData = UpdateUpdateSchema.parse(body)

    // Verify update exists and user owns the product
    const update = await queryRow(
      `SELECT pu.id, p.submitter_id
       FROM product_updates pu
       JOIN products p ON pu.product_id = p.id
       WHERE pu.id = ? AND pu.product_id = ?`,
      [updateId, productId]
    )

    if (!update) {
      return NextResponse.json(
        { error: "Update not found" },
        { status: 404 }
      )
    }

    if (update.submitter_id !== user.id) {
      return NextResponse.json(
        { error: "You can only edit updates for your own products" },
        { status: 403 }
      )
    }

    // Build update query
    const updateFields: string[] = []
    const updateParams: any[] = []

    if (validatedData.title !== undefined) {
      updateFields.push("title = ?")
      updateParams.push(validatedData.title)
    }

    if (validatedData.content !== undefined) {
      updateFields.push("content = ?")
      updateParams.push(validatedData.content)
    }

    if (validatedData.version !== undefined) {
      updateFields.push("version = ?")
      updateParams.push(validatedData.version)
    }

    if (validatedData.update_type !== undefined) {
      updateFields.push("update_type = ?")
      updateParams.push(validatedData.update_type)
    }

    if (validatedData.is_major !== undefined) {
      updateFields.push("is_major = ?")
      updateParams.push(validatedData.is_major)
    }

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      )
    }

    updateParams.push(updateId)

    await executeQuery(
      `UPDATE product_updates SET ${updateFields.join(", ")} WHERE id = ?`,
      updateParams
    )

    return NextResponse.json({ message: "Update updated successfully" })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Failed to update update:", error)
    return NextResponse.json(
      { error: "Failed to update update" },
      { status: 500 }
    )
  }
}

// DELETE - Delete update
export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const { id: productId, updateId } = await params

    // Verify update exists and user owns the product
    const update = await queryRow(
      `SELECT pu.id, p.submitter_id
       FROM product_updates pu
       JOIN products p ON pu.product_id = p.id
       WHERE pu.id = ? AND pu.product_id = ?`,
      [updateId, productId]
    )

    if (!update) {
      return NextResponse.json(
        { error: "Update not found" },
        { status: 404 }
      )
    }

    if (update.submitter_id !== user.id) {
      return NextResponse.json(
        { error: "You can only delete updates for your own products" },
        { status: 403 }
      )
    }

    // Delete the update
    await executeQuery(
      "DELETE FROM product_updates WHERE id = ?",
      [updateId]
    )

    return NextResponse.json({ message: "Update deleted successfully" })

  } catch (error) {
    console.error("Failed to delete update:", error)
    return NextResponse.json(
      { error: "Failed to delete update" },
      { status: 500 }
    )
  }
}