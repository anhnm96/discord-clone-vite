import { computed } from 'vue'
import { useQuery } from 'vue-query'
import { gKey } from '@/helpers/querykeys'
import { getUserGuilds } from '@/api/handler/guilds'
import { Guild } from '@/types'

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
