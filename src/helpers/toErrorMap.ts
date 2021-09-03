import { AxiosError } from 'axios'

interface ErrorMap {
  [key: string]: string
}

export function toErrorMap(err: AxiosError): ErrorMap {
  const errors = err?.response?.data?.errors;
  const errorMap = <ErrorMap>{};
  errors.forEach(({ field, message }: Record<string, string>) => {
    errorMap[field] = message;
  })
  return errorMap
}
