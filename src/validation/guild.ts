import { object, string } from 'yup'

export const GuildSchema = object({
  name: string().min(3).max(30).required(),
})
