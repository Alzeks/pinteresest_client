//https://back-one-tau.vercel.app
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import './gallery.css'
import GalleryItem from './galleryItem/galleryItem';
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';

const fetchPins = async ({ pageParam, username, search }) => {
    const res = await axios.get(`https://nestjs-peach.vercel.app/pins?search=${search || ''}&username=${username || ''}&pageParam=${pageParam}`,
    )
    return res.data
}
const Gallery = ({ username }) => {

    const queryClient = useQueryClient();
    const [param] = useSearchParams()
    let search = param.get("search")

    const { data, fetchNextPage, hasNextPage, status, error } = useInfiniteQuery({
        queryKey: ['pins', search],
        queryFn: ({ pageParam = 0 }) => fetchPins({ pageParam, username, search }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => lastPage.hasNextPage//nextCursor
    })

    if (status === "error") return <div>{'error occurred:' + ' ' + error.message}</div>
    if (status === 'panding') return <div>"loading..."</div>
    if (data?.pages[0].length === 0) return <h2 >Pins not found</h2>

    const allPins = data?.pages[0].flatMap(page => page) || []

    return (
        <InfiniteScroll dataLength={allPins.length}
            next={fetchNextPage} hasMore={!!hasNextPage}
            loader={<h4>Loading more  pins</h4>}
            endMessage={<p style={{'font-size': '12px'}}>Data received</p>}
        >
            <div className="gallery" >
                {data && allPins.map(pin => (
                    <GalleryItem key={pin._id} pin={pin} />
                ))}
            </div>
        </InfiniteScroll>
    )
}

export default Gallery;
