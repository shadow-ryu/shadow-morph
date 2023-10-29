import { string, z } from 'zod'

export const GuildValidation = z.object({
    name: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(128, {
      message: 'Title must be less than 128 characters long',
    }),
    guild_handle:z.string(),
    ownerID:z.string(),
    info: z.any(),
    guild_logo: z.string(),
    tags: z.string()
})


export type GuildCreationRequest = z.infer<typeof GuildValidation>