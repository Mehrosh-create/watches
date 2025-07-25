import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Review from '@/models/Review'
import dbConnect from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const reviews = await Review.find({ productId: params.id })
      .populate('userId', 'name')
    return NextResponse.json({ success: true, data: reviews })
  } catch (error) {
    console.error('GET_REVIEWS_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const reviewData = await request.json()
    const review = await Review.create({
      ...reviewData,
      productId: params.id,
      userId: session.user.id
    })

    return NextResponse.json(
      { success: true, data: review },
      { status: 201 }
    )
  } catch (error) {
    console.error('CREATE_REVIEW_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to create review" },
      { status: 500 }
    )
  }
}