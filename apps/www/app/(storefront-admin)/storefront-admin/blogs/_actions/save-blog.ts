"use server";

import { revalidatePath } from "next/cache";
import { Blogs, prisma } from "@/db";
import { nextId } from "@/lib/nextId";
import { slugModel } from "@/lib/utils";

import { deleteRealtimeMdx } from "./real-time-mdx";

export async function saveBlogAction(data: Blogs) {
    if (data.id)
        await prisma.blogs.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                updatedAt: new Date(),
                content: data.content,
                meta: data.meta as any,
                status: data.status,
                publishedAt: data.publishedAt,
            },
        });
    else
        await prisma.blogs.create({
            data: {
                // id: await nextId(prisma.blogs),
                title: data.title,
                content: data.content,
                slug: await slugModel(data.title, prisma.blogs),
                authorId: 1,
                type: data.type,
                meta: data.meta as any,
                status: data.status,
                publishedAt: data.publishedAt,
            },
        });
    revalidatePath("/shop-admin/blogs/edit/[...slug]");
}
