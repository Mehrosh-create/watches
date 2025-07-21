import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prisma from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await prisma.product.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PRODUCT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}