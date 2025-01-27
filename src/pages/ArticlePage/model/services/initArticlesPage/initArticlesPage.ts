import { ActionCreatorWithPayload, createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import {
  useInitialEffect,
} from 'shared/lib/hooks/useAppDispatch/useInitialEffect/useInitialEffect';
import { ArticleSortFieldType, ArticleType } from 'entities/Article/model/types/Article';
import { SortOrder } from 'shared/types/Order';
import { articlePageActions } from '../../slices/articlePageSlice/articlePageSlice';
import { fetchArticles } from '../../services/fetchArticles/fetchArticles';
import {
  getArticlePageInited,
} from '../../selectors/getArticlePageSelector/getArticlePageSelector';

const mapParamToAction: Record<
  string,
  ActionCreatorWithPayload<ArticleSortFieldType> |
  ActionCreatorWithPayload<SortOrder> |
  ActionCreatorWithPayload<string> |
  ActionCreatorWithPayload<ArticleType>
  > = {
    sort: articlePageActions.setSort,
    order: articlePageActions.setOrder,
    search: articlePageActions.setSearch,
    type: articlePageActions.setType,
  };

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
  >(
    'articlePage/initArticlesPage',
    async (searchParams, thunkAPI) => {
      const { dispatch, getState } = thunkAPI;
      const isInited = getArticlePageInited(getState());

      const getParamFromUrl = (param: string) : string | null => searchParams.get(param);

      // eslint-disable-next-line guard-for-in
      for (const mapParamToActionKey in mapParamToAction) {
        const paramValue = getParamFromUrl(mapParamToActionKey);
        if (paramValue) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch(mapParamToAction.mapParamToActionKey(paramValue));
        }
      }

      useInitialEffect(() => {
        if (!isInited) {
          dispatch(articlePageActions.initState());
          dispatch(fetchArticles({ replace: false }));
        }
      });
    },
  );
