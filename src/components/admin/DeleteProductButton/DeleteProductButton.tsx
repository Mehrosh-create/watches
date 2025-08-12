'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

interface DeleteProductButtonProps {
  productId: string
  productName: string
  onSuccess?: () => void
  className?: string
}

export function DeleteProductButton({
  productId,
  productName,
  onSuccess,
  className = '',
}: DeleteProductButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      toast.success(`"${productName}" deleted successfully`)
      router.refresh()
      onSuccess?.()
    } catch (error) {
      toast.error('Could not delete product. Please try again.')
      console.error('Delete product error:', error)
    } finally {
      setIsDeleting(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setIsOpen(true)}
        className={className}
        aria-label={`Delete ${productName}`}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{productName}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <span className="animate-pulse">Deleting...</span>
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// Optional: Barrel file export
// components/admin/DeleteProductButton/index.ts
// export * from './DeleteProductButton'