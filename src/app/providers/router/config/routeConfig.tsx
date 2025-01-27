import { RouteProps } from 'react-router-dom';

import { MainPageAsync } from 'pages/MainPage';
import { AboutPageAsync } from 'pages/AboutPage';
import { ProfilePageAsync } from 'pages/ProfilePage';
import { NotFoundPage } from 'pages/NotFoundPage';

import { AppRoutes, RoutePaths } from 'shared/config/routes/routes';
import { ArticlePageAsync } from 'pages/ArticlePage';
import { ArticleDetailsPageAsync } from 'pages/ArticleDetailsPage';
import { ArticleEditPageAsync } from 'pages/ArticleEditPage';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePaths[AppRoutes.MAIN],
    element: <MainPageAsync />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePaths[AppRoutes.ABOUT],
    element: <AboutPageAsync />,
  },
  [AppRoutes.PROFILE]: {
    path: `${RoutePaths[AppRoutes.PROFILE]}:id`,
    element: <ProfilePageAsync />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePaths[AppRoutes.ARTICLES],
    element: <ArticlePageAsync />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES_DETAILS]: {
    path: `${RoutePaths[AppRoutes.ARTICLES_DETAILS]}:id`,
    element: <ArticleDetailsPageAsync />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: `${RoutePaths[AppRoutes.ARTICLE_EDIT]}`,
    element: <ArticleEditPageAsync />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: `${RoutePaths[AppRoutes.ARTICLE_CREATE]}`,
    element: <ArticleEditPageAsync />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
