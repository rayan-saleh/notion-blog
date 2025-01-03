import FormattedDate from "@/components/FormattedDate";
import { useConfig } from "@/lib/config";
import Link from "next/link";

const BlogPost = ({ post }) => {
  const BLOG = useConfig();

  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className="">
        <header className="flex mb-2 md:flex-row items-baseline justify-between">
          
          <h2 className="text-lg cursor-pointer text-black dark:text-gray-100">
            {post.title}
          </h2>
          <time className="flex-shrink-0 mr-2 text-gray-600 dark:text-gray-400">
            <FormattedDate date={post.date} />
          </time>
        </header>
        {/* <main>
          <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
            {post.summary}
          </p>
        </main> */}
      </article>
    </Link>
  );
};

export default BlogPost;
