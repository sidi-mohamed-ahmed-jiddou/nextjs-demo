'use client'

import { getPosts } from '@/actions/posts'
import DeletePostButton from '@/components/DeletePostButton'
import EditPostModal from '@/components/EditPostModal'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function Posts() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  const [editingPost, setEditingPost] = useState<{ id: number; title: string; content: string } | null>(null)

  return (
    <div className="p-6 space-y-4">
      {/* <h1 className="text-2xl font-bold mb-4"> Posts</h1> */}

      <ul className="space-y-4">
        {data?.map((post: { id: number; title: string; content: string }) => (
          <li
            key={post.id}
            className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-600">
              {post.title}
            </h3>
            <p className="text-gray-700 mt-1">{post.content}</p>

            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingPost(post)}
              >
                Edit
              </Button>
              <DeletePostButton postId={post.id} />
            </div>
          </li>
        ))}
      </ul>

      {editingPost && (
        <EditPostModal
          post={editingPost}
          open={!!editingPost}
          onOpenChange={(open) => !open && setEditingPost(null)}
        />
      )}
    </div>
  )
}
