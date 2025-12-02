import { getPosts } from '@/actions/posts'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import PostList from './PostList'
import { Suspense } from 'react'
import { getQueryClient } from '@/app/get-query-client'
import Loading from '../admin/posts/loading'

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
