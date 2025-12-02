import { getPosts } from '@/actions/posts'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import PostList from './PostList'
import { Suspense } from 'react'
import Loading from './loading'
import { getQueryClient } from '@/app/get-query-client'

export default async function PostsPage() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList />
    </HydrationBoundary>
    </Suspense>
  )
}
