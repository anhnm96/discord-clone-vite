import { ref, Ref } from 'vue'
import { useQuery } from 'vue-query'
import { dmKey } from '@/helpers'
import { DirectMessage } from '@/types'

export function useGetCurrentDM(
  channelId: string
): Ref<DirectMessage | undefined> {
  const result = ref<DirectMessage>()
  useQuery<DirectMessage[]>(dmKey, {
    onSuccess: (d) => {
      result.value = d?.find((dm) => dm.id === channelId)
    },
  })
  return result
}
