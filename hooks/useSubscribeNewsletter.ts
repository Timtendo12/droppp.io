import { useQueryClient } from '@tanstack/react-query'
import { ApiError } from '@/api/core/errors'
import { useAuth } from '@/contexts/auth'
import {
  newsletterKey,
  useGetNewsletter
} from '@/api/resources/user/newsletter/get'
import { useSubscribeNewsletterMutation } from '@/api/resources/user/newsletter/subscribe'
import { useUnsubscribeNewsletterMutation } from '@/api/resources/user/newsletter/unsubscribe'
import { UserNewsletterSubscribeResponse } from '@/api/resources/user/newsletter/subscribe/schema'
import { UserNewsletterUnsubscribeResponse } from '@/api/resources/user/newsletter/unsubscribe/schema'
import { UserNewsletterGetResponse } from '@/api/resources/user/newsletter/get/schema'

type UpdateSuccessCallback = (toggledTo: boolean) => void
type UpdateFailureCallback = (error: ApiError) => void

type UseNewsletterSubscriptionInput = {
  onUpdateSuccess?: UpdateSuccessCallback
  onUpdateFailure?: UpdateFailureCallback
}

type UpdateSubscriptionResponse =
  | UserNewsletterSubscribeResponse
  | UserNewsletterUnsubscribeResponse

type UseNewsletterSubscriptionResult = {
  isSubscriptionLoading: boolean
  isSubscriptionUpdating: boolean
  isSubscribed?: boolean
  emailAddress?: string
  isRelayedEmail?: boolean
  isAppleRelayedEmail?: boolean
  updateSubscription?: (toggleTo: boolean, email?: string) => void
  updateSubscriptionAsync?: (
    toggleTo: boolean,
    email?: string
  ) => Promise<UpdateSubscriptionResponse>
}

type SubscribeMutationContext = { previousData: UserNewsletterGetResponse }

export const useSubscribeNewsletter = ({
  onUpdateSuccess,
  onUpdateFailure
}: UseNewsletterSubscriptionInput = {}): UseNewsletterSubscriptionResult => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const { data: subscription, isLoading: isSubscriptionLoading } =
    useGetNewsletter()

  const notifySuccess = (subscribed: boolean) => {
    queryClient.invalidateQueries(newsletterKey()).then()
    onUpdateSuccess?.(subscribed)
  }

  const notifyFailure = (
    error: ApiError,
    previousQueryData: UserNewsletterGetResponse
  ) => {
    queryClient.setQueryData(newsletterKey(), previousQueryData)
    onUpdateFailure?.(error)
  }

  const optimisticUpdate = (subscribed: boolean, email: string = null) => {
    queryClient.cancelQueries(newsletterKey()).then()

    const previousData = queryClient.getQueryData<UserNewsletterGetResponse>(
      newsletterKey()
    )

    queryClient.setQueryData(newsletterKey(), {
      ...previousData,
      subscribed,
      subscribed_email: email
    })

    return { previousData }
  }

  const {
    mutate: subscribe,
    mutateAsync: subscribeAsync,
    isLoading: isSubscribing
  } = useSubscribeNewsletterMutation({
    onMutate: ({ email }) => optimisticUpdate(true, email),
    onSuccess: () => notifySuccess(true),
    onError: (error, _inputData, context) =>
      notifyFailure(error, (context as SubscribeMutationContext).previousData)
  })

  const {
    mutate: unsubscribe,
    mutateAsync: unsubscribeAsync,
    isLoading: isUnsubscribing
  } = useUnsubscribeNewsletterMutation({
    onMutate: () => optimisticUpdate(false),
    onSuccess: () => notifySuccess(false),
    onError: (error, _inputData, context) =>
      notifyFailure(error, (context as SubscribeMutationContext).previousData)
  })

  const updateSubscription = (subscribed: boolean, email?: string) =>
    subscribed ? subscribe({ email }) : unsubscribe()

  const updateSubscriptionAsync = (subscribed: boolean, email?: string) =>
    subscribed ? subscribeAsync({ email }) : unsubscribeAsync()

  if (user && !isSubscriptionLoading) {
    const { subscribed, subscribed_email } = subscription
    const isRelayedEmail = user?.oauth_provider && user?.email_relay
    const isAppleRelayedEmail = user?.oauth_provider === 'apple' && user?.email_relay
    return {
      isSubscriptionLoading: false,
      isSubscribed: subscribed,
      isRelayedEmail,
      isAppleRelayedEmail,
      emailAddress: subscribed_email,
      updateSubscription,
      updateSubscriptionAsync,
      isSubscriptionUpdating: isSubscribing || isUnsubscribing
    }
  } else {
    return {
      isSubscriptionLoading: true,
      isSubscriptionUpdating: false
    }
  }
}
