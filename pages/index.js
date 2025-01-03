/* eslint-disable react/no-unescaped-entities */
import { clientConfig } from "@/lib/server/config";

import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
import Pagination from "@/components/Pagination";
import { getAllPosts } from "@/lib/notion";
import { useConfig } from "@/lib/config";
import Link from "next/link";

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(0, clientConfig.postsPerPage);
  const totalPosts = posts.length;
  const showNext = totalPosts > clientConfig.postsPerPage;
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
    },
    revalidate: 1,
  };
}

export default function Blog({ postsToShow, page, showNext }) {
  const { title, description } = useConfig();

  return (
    <Container title={title} description={description}>
      {postsToShow.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
      <h2 className="text-lg mt-12 mb-2 font-semibold">Bio</h2>
      {/* for scuba i want a link without underlining it */}
      <p>
      I'm a product builder focused on Go-To-Market. I’ve helped build/grow <Link href="https://conceptventures.vc/" className="underline" target="_blank">Concept Ventures</Link>, <Link href="https://www.oneday.co.uk/" className="underline" target="_blank">OneDay</Link>, and <Link href="https://elevenlabs.io/" className="underline" target="_blank">ElevenLabs</Link>. I like creating new things, occasionally, I <Link href="https://www.youtube.com/watch?v=NAdQyjpOfrs" className="" target="_blank">scuba</Link>.
      </p>
    </Container>
  );
}
