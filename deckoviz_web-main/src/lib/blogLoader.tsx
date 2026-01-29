import fm from "front-matter"

export type MarkdownBlog = {
  slug: string
  id: number
  title: string
  tag: string
  tagColor: string
  date: string
  readTime: string
  pinned: boolean
  image: string
  size: "small" | "medium" | "large"
  description?: string
  content: string
  enterpriseCategory?: string  
}

export async function loadBlogs(): Promise<MarkdownBlog[]> {
  const files = import.meta.glob("/src/content/blogs/*.md", {
    as: "raw",
    eager: true,
  })

  const blogs: MarkdownBlog[] = []

  for (const [path, raw] of Object.entries(files)) {
    const { attributes, body } = fm(raw as string)

    const data = attributes as any

    blogs.push({
      slug: path.split("/").pop()?.replace(".md", "") || "",
      id: Number(data.id ?? 0),
      title: String(data.title ?? ""),
      tag: String(data.tag ?? "General"),
      tagColor: String(
        data.tagColor ?? "bg-purple-100 text-purple-700"
      ),
      date: String(data.date ?? ""),
      readTime: String(data.readTime ?? ""),
      pinned: Boolean(data.pinned),
      image: String(data.image ?? ""),
      size: (data.size as "small" | "medium" | "large") ?? "small",
      description: String(data.description ?? ""),
enterpriseCategory: String(data.enterpriseCategory ?? "Core Industry Pages"),
content: body,

    })
  }

  return blogs
}