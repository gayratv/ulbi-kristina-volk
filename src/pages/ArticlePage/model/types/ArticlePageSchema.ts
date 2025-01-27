import { EntityState } from '@reduxjs/toolkit';
import {
  Article, ArticleSortFieldType, ArticleType, ArticleView,
} from 'entities/Article/model/types/Article';
import { SortOrder } from 'shared/types/Order';

export interface ArticlePageSchema extends EntityState<Article>{
  isLoading?: boolean;
  error?: string;
  view: ArticleView;

  // pagination
  page: number;
  limit?: number;
  hasMore: boolean;

  // filters
  order: SortOrder;
  sort: ArticleSortFieldType;
  search: string;
  type: ArticleType;

  _inited: boolean;
}
