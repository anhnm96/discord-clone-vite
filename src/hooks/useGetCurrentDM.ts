import { computed } from 'vue'
import { useQuery } from 'vue-query'
import { dmKey } from '@/helpers'
import { DirectMessage } from '@/types'

export function useGetCurrentDM(channelId: string) {
  const { data } = useQuery<DirectMessage[]>(dmKey)

  return computed(() => {
    return data.value?.find((dm) => dm.id === channelId)
  })
}
