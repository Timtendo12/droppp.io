import { z } from 'zod'
import { ApiUrl } from '../url'
import http from './axios'
import { parseForSchema } from '@/util/jsonHelper'

export default async function post<T>(
  { path, params }: ApiUrl,
  options?: {},
  schema?: z.ZodType<T>
): Promise<T> {
  const response = await http.post(path, params, options)
  return parseForSchema(response.data, schema)
}
