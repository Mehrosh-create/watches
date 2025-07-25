import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Review from '@/models/Review'
import dbConnect from '@/lib/db'

const unauthorizedResponse = () => NextResponse.json(
  { success: false, error: "Unauthorized" },
  { status: 401 }
)

const notFoundResponse = () => NextResponse.json(
  { success: false, error: "Review not found" },
  { status: 404 }
)

export async function DELETE(
  request: Request,
  { params }: { params: { id: string, reviewId: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user) return unauthorizedResponse()

    const review = await Review.findById(params.reviewId)
    if (!review) return notFoundResponse()

    // Only allow admin or review owner to delete
    if (session.user.role !== 'admin' && review.userId.toString() !== session.user.id) {
      return unauthorizedResponse()
    }

    await Review.findByIdAndDelete(params.reviewId)
    return NextResponse.json({ success: true, data: { id: params.reviewId } })
  } catch (error) {
    console.error('DELETE_REVIEW_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to delete review" },
      { status: 500 }
    )
  }
}