// Import statements remain the same
import { personalData } from "@/utils/data/personal-data";

// Add cache and revalidate options to the fetch
async function getBlogs() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

// Set export const dynamic = 'force-dynamic' if you want to disable static optimization
export const dynamic = 'force-dynamic';

// Add metadata export
export const metadata = {
  title: 'Blog Posts',
  description: 'Read my latest blog posts about technology and development',
};

// Main page component
export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No blog posts found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
          {blogs.map((blog) => 
            blog?.cover_image ? (
              <BlogCard 
                key={blog.id || Math.random().toString()} 
                blog={blog} 
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

// Add a loading file in the same directory
// loading.js
export function Loading() {
  return (
    <div className="py-8 animate-pulse">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="bg-gray-200 h-8 w-48 rounded-md"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-64 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}
