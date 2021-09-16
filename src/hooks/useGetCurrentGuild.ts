import { computed } from 'vue'
import { useQuery } from 'vue-query'
import { gKey, mKey } from '@/helpers/querykeys'
import { getUserGuilds, getGuildMembers } from '@/api/handler/guilds'
import { Guild, User } from '@/types'

export function useGetGuildList() {
  const { data: guilds } = useQuery<Guild[]>(gKey, () =>
    getUserGuilds().then((res) => res.data)
  )
  return guilds
}

export function useGetCurrentGuild(guildId: string) {
  const guilds = useGetGuildList()
  return computed(() => guilds.value?.find((g: Guild) => g.id === guildId))
}

export function useGetGuildMembers(guildId: string) {
  const key = mKey(guildId)
  return useQuery<User[]>(key, () =>
    getGuildMembers(guildId).then((res) => res.data)
  )
}
