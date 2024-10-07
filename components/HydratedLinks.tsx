import type { ParsedUrlQuery } from 'querystring'

export interface Link {
  path: string
  matchingPath?: MatchingPath
  params?: any
  matchingParams?: any
}

export type MatchingPath = {
  path: string
  componentMatches?: any
}

export type HydratedLink<L extends Link> = {
  active: boolean
  href: string
} & L

type MatchedParams = {
  matches: number
  expected: number
}

type ActiveLink<L extends Link> = {
  index: number
  link: L
  matchedParams: MatchedParams
}

const comparisonPath = <L extends Link>(link: L, query: ParsedUrlQuery) => {
  const defaultPath = link.path

  if (!link.matchingPath) {
    return defaultPath
  }

  if (link.matchingPath.componentMatches) {
    const componentMatches = Object.entries(link.matchingPath.componentMatches)

    for (const [component, value] of componentMatches) {
      if (!query[component]) continue
      if (query[component] !== value) return defaultPath
    }
  }

  return link.matchingPath.path
}

const matchedParamCount = (
  query: ParsedUrlQuery,
  params?: URLSearchParams
): MatchedParams | undefined => {
  if (!params) return undefined

  let expected = 0
  let matches = 0

  for (const [key, value] of params.entries()) {
    expected += 1
    if (query[key] && query[key] === value) matches += 1
  }

  return { matches, expected }
}

export const hydrateLinks = <L extends Link>(
  pathname: string,
  query: ParsedUrlQuery,
  links: L[]
): HydratedLink<L>[] => {
  const activeLink = links.reduce(
    (candidate: ActiveLink<L> | undefined, link, index) => {
      if (pathname !== comparisonPath(link, query)) {
        return candidate
      }

      const newCandidate: ActiveLink<L> = {
        index: index,
        link: link,
        matchedParams: matchedParamCount(
          query,
          link.matchingParams || link.params
        )
      }

      if (
        // If we don't have a candidate and the new candidate doesn't have
        // params to check against, then return the new candidate as the
        // active link.
        (!candidate && !newCandidate.matchedParams) ||
        // ... if the new candidate has params and and the total matches
        // equal the total expected, we can safely assume we are on the
        // correct url and can promote the new candidate as the active link.
        (newCandidate.matchedParams &&
          newCandidate.matchedParams.expected ===
            newCandidate.matchedParams.matches)
      ) {
        return newCandidate
      }

      return candidate
    },
    undefined
  )

  return links.map((link, index) => {
    const href =
      link.path + (!!link.params ? '/?' + link.params.toString() : '')
    const active = index === activeLink?.index || false
    return { active: active, href: href, ...link }
  })
}

interface Props<L extends Link> {
  pathname: string
  query: ParsedUrlQuery
  links: L[]
  children: JSX.Element | ((link: HydratedLink<L>) => JSX.Element)
}

const HydratedLinks = <L extends Link>({
  pathname,
  query,
  links,
  children
}: Props<L>): JSX.Element => (
  <>
    {hydrateLinks(pathname, query, links).map(link => {
      return typeof children === 'object' ? children : children(link)
    })}
  </>
)

export default HydratedLinks
