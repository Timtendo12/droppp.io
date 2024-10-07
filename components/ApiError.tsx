import { ZodIssue } from 'zod'
import { isApiError, isZodError } from '@/api/core/errors'

export default function ErrorDetail({ error }: { error: unknown }) {
  // RQ POC - typed error from the API can be accessed in the component - Eric, Fri Jan 20 2023
  return (
    <>
      <h5 className="h5">Error!</h5>
      {isApiError(error) ? (
        <>
          <p>{`${error.statusCode} - ${error.message}`}</p>
          <p>{JSON.stringify(error.details)}</p>
        </>
      ) : isZodError(error) ? (
        <>
          <p>API response is invalid!</p>
          {error.errors.map((issue: ZodIssue, index) => (
            <div className="mt-1" key={index}>
              <div>{issue.path.join('/')}</div>
              <div>{issue.message}</div>
            </div>
          ))}
        </>
      ) : (
        <p>Something went wrong.</p>
      )}
    </>
  )
}
