import { computed } from 'vue'
import { useQuery } from 'vue-query'
import { Channel } from '@/types'
import { cKey } from '@/helpers'
import { getChannels } from '@/api/handler/channel'

export function useGetChannelList(guildId: string) {
  const key = cKey(guildId)
  return useQuery<Channel[]>(key, () =>
    getChannels(guildId).then((res) => res.data)
  )
}

export function useGetCurrentChannel(guildId: string, channelId: string) {
  const { data: channels } = useGetChannelList(guildId)
  return computed(() => {
    return channels.value?.find((c) => c.id === channelId)
  })
  // const result = ref()
  // useQuery(key, {
  //   onSuccess: (d) => {
  //     result.value = d?.find((c) => c.id === channelId)
  //   },
  // })
  // console.log(key, channelId, result.value)
  // return result
}
