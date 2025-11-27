'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updatePost } from '@/actions/posts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface EditPostModalProps {
    post: {
        id: number
        title: string
        content: string
    }
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function EditPostModal({ post, open, onOpenChange }: EditPostModalProps) {
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async () => {
            await updatePost(post.id, { title, content })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            onOpenChange(false)
            toast.success('Post updated successfully')
        },
        onError: (error) => {
            toast.error(`Failed to update post: ${error.message}`)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">
                            Content
                        </Label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="col-span-3 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
