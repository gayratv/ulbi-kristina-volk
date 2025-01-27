import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsData = ((
  state:StateSchema,
) => state.articleDetails?.data || undefined);

export const getArticleDetailsError = ((
  state:StateSchema,
) => state.articleDetails?.error || undefined);

export const getArticleDetailsIsLoading = ((
  state:StateSchema,
) => state.articleDetails?.isLoading || false);
