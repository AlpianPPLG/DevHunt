/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { blogPosts } from "@/lib/blog-data"
import { Metadata } from "next"
import { use } from "react"

// This file handles the metadata generation as a server component
// While keeping the page.tsx file as a client component for interactivity
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = use(params as any) as { slug: string };
  const post = blogPosts.find(post => post.slug === resolvedParams.slug)
  
  if (!post) {
    return {
      title: "Article Not Found - DevHunt",
      description: "The requested article could not be found."
    }
  }
  
  return {
    title: `${post.title} - DevHunt Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
      type: "article",
      authors: [post.author.name],
      publishedTime: post.date
    }
  }
}