import FormattedDate from "@/components/FormattedDate";
import { useConfig } from "@/lib/config";
import Link from "next/link";

const BlogPost = ({ post }) => {
  const BLOG = useConfig();

  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className="group">
        <header className="flex mb-2 md:flex-row items-baseline justify-between">
          
          <h2 className="text-lg cursor-pointer text-black dark:text-gray-100 transition-colors duration-200 group-hover:text-gray-600 dark:group-hover:text-gray-300">
            {post.title}
          </h2>
          <time className="flex-shrink-0 mr-2 text-gray-600 dark:text-gray-400 transition-colors duration-200 group-hover:text-gray-400 dark:group-hover:text-gray-500">
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
