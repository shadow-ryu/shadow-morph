import { db } from "@/lib/db";
import { guilds, posts, presets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { json } from "stream/consumers";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = null;

  let followedCommunitiesIds: string[] = [];

  //   if (session) {
  //     const followedCommunities = await db.subscription.findMany({
  //       where: {
  //         userId: session.user.id,
  //       },
  //       include: {
  //         subreddit: true,
  //       },
  //     })

  //     followedCommunitiesIds = followedCommunities.map((sub) => sub.subreddit.id)
  //   }

  try {
    const { limit, page, subredditName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subredditName: z.string().nullish().optional(),
      })
      .parse({
        subredditName: url.searchParams.get("subredditName"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    let whereClause = {};

    // if (subredditName) {
    //   whereClause = {
    //     subreddit: {
    //       name: subredditName,
    //     },
    //   };
    // } else if (session) {
    //   whereClause = {
    //     subreddit: {
    //       id: {
    //         in: followedCommunitiesIds,
    //       },
    //     },
    //   };
    // }

    // const posts = await db.findMany({
    //   take: parseInt(limit),
    //   skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    //   include: {
    //     subreddit: true,
    //     votes: true,
    //     author: true,
    //     comments: true,
    //   },
    //   where: whereClause,
    // })
    const postsD = await db.query.posts.findMany({
      with:{
        author:true,
        // guilds:true,
        // posts:true
      }
    })
    //   take: parseInt(limit),
    //   skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
    //   // orderBy: {
    //   //   createdAt: 'desc',
    //   // },.leftJoin(posts.guildId, eq(posts.guildId, guilds.id))
    // }).leftJoin(users, eq(posts.id, users.id));
    // await db.select().from(posts).leftJoin(users, eq(posts.authorId, users.id)).limit(parseInt(limit)).offset((parseInt(page) - 1) * parseInt(limit))
    return new Response(JSON.stringify(postsD));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
