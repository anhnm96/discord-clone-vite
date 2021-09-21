import { computed } from 'vue'
import { useQuery } from 'vue-query'
import { dmKey } from '@/helpers'
import { DirectMessage } from '@/types'
import { getUserDMs } from '@/api/handler/dm'

export function useGetDMList() {
  return useQuery<DirectMessage[]>(dmKey, () =>
    getUserDMs().then((res) => res.data)
  )
}

export function useGetCurrentDM(channelId: string) {
  const { data } = useGetDMList()

  return computed(() => {
    return data.value?.find((dm) => dm.id === channelId)
  })
}
