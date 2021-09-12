import { ref, onMounted } from 'vue'
import { useQuery } from 'vue-query'
import { gKey } from '@/helpers/querykeys'

// export function useGetCurrentGuild(guildId: string) {
//   const result = ref()
//   useQuery(gKey, {
//     onSuccess: (d) => {
//       result.value = d?.find((g) => g.id === guildId)
//       console.log(result.value)
//     },
//     onError: (e) => {
//       console.log(e)
//     },
//   })
//   console.log('useGetCurrentGuild')
//   return result
// }

export function useGetCurrentGuild(guildId: string) {
  const { data } = useQuery(gKey)

  console.log('data', data.value)
  return data.value?.find((g) => g.id === guildId)
}
