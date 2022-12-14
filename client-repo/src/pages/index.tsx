import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { Post, Sub } from "../types";
import axios from "axios";
import { useAuthState } from "../context/auth";
import useSWRInfinite from "swr/infinite";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { authenticated } = useAuthState();

  const fetcher = async (url: string) => {
    return await axios.get(url).then((res) => res.data);
  };
  const address = "/subs/sub/topSubs";

  const getKey = (pageIndex: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/posts?page=${pageIndex}`;
  };

  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    mutate,
  } = useSWRInfinite<Post[]>(getKey);

  const isInitialLoading = !data && !error;
  const posts: Post[] = data ? ([] as Post[]).concat(...data) : [];
  const { data: topSubs } = useSWR<Sub[]>(address, fetcher);

  const [observedPost, setObservedPost] = useState("");

  useEffect(() => {
    //포스트가 없으면 return
    if (!posts || posts.length === 0) return;
    // posts 배열의 마지막 포스트 id 가져옴
    const id = posts[posts.length - 1].identifier;
    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const observeElement = (element: HTMLElement | null) => {
    if (!element) return;
    //브라우저 뷰포트와 설정한 요소의 교차점 관찰
    const observer = new IntersectionObserver(
      //entries 는 인터섹션옵서버엔트리 인스턴스의 배열
      (entries) => {
        //isintersecting: 관찰 대상의 교차상태
        if (entries[0].isIntersecting === true) {
          console.log("마지막 포스트입니다.");
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    //대상요소 관찰 시작
    observer.observe(element);
  };

  return (
    <div className=" flex mt-10 max-w-5xl px-4 pt-5 mx-auto">
      {/* 포스트 리스트 */}
      <div className=" w-full md:mr-3 md:2-w/12">
        {isInitialLoading && (
          <p className=" text-lg text-center"> loading...</p>
        )}
        {posts?.map((post) => (
          <PostCard key={post.identifier} post={post} mutate={mutate} />
        ))}
      </div>
      {/* 사이드바 */}
      <div className="hidden w-4/12 ml-3 md:block">
        <div className=" bg-white border rounded">
          <div className="p-4 border-b">
            <p className=" text-lg font-semibold text-center">상위 커뮤니티</p>
          </div>
          {/* 커뮤니티 리스트 */}
          <div>
            {topSubs?.map((sub) => (
              <div
                key={sub.name}
                className=" flex items-center px-4 py-2 text-xs border-b"
              >
                <Link href={`/r/${sub.name}`} legacyBehavior>
                  <a>
                    <Image
                      src={sub.imageUrl}
                      className="rounded-full cursor-pointer"
                      alt="Sub"
                      width={24}
                      height={24}
                    />
                  </a>
                </Link>
                <Link href={`/r/${sub.name}`} legacyBehavior>
                  <a className=" ml-2 font-bold hover:cursor-pointer">
                    /r/{sub.name}
                  </a>
                </Link>
                <p className=" ml-auto font-medium">{sub.postCount}</p>
              </div>
            ))}
          </div>
          {authenticated && (
            <div className=" w-full py-6 text-center">
              <Link href="/subs/create" legacyBehavior>
                <a className=" w-full p-2 text-center text-white bg-gray-400 rounded">
                  커뮤니티 만들기
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
