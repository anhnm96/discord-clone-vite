import { ref } from 'vue'
import { useQuery } from 'vue-query'

export function useGetCurrentChannel(channelId: string, key: string) {
  const result = ref()
  useQuery(key, {
    onSuccess: (d) => {
      result.value = d?.find((c) => c.id === channelId)
    },
  })
  console.log(key, channelId, result.value)
  return result
}
