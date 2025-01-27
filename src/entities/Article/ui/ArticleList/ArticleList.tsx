import React, { HTMLAttributeAnchorTarget, memo } from 'react';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { PAGE_ID } from 'shared/const/common';
import { Article, ArticleView } from '../../model/types/Article';
import { ArticleListItem } from '../../ui/ArticleListItem/ArticleListItem';

import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import classes from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Array<Article>,
	isLoading?: boolean,
	view?: ArticleView,
    target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.TILE ? 9 : 3)
  .fill(0)
  .map((item, index) => (
       <ArticleListItemSkeleton
          className={classes.card}
         // eslint-disable-next-line react/no-array-index-key
          key={index}
          view={view}
       />
  ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.TILE,
    target,
  } = props;

  const { t } = useTranslation('article');

  const isList = view === ArticleView.LIST;
  const itemsPerRow = isList ? 1 : 3;
  const rowCount = isList ? articles.length : Math.ceil(articles.length / itemsPerRow);

  const rowRenderer = ({ key, index, style }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);
    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
           <ArticleListItem
              target={target}
              view={view}
              article={articles[i]}
              key={articles[i].id}
              className={classes.card}
           />,
      );
    }
    return (
         <div
            key={key}
            style={style}
            className={classes.row}
         >
              {items}
         </div>
    );
  };

  if (!isLoading && !articles.length) {
    return (
         <div className={classNames(classes.ArticleList, {}, [className, classes[view]])}>
              <Text size={TextSize.L} title={t('not-found-articles')} />
         </div>
    );
  }

  return (
       <WindowScroller
          onScroll={() => console.log('scroll')}
          scrollElement={document.getElementById(PAGE_ID) as Element}
       >
            {({
              width,
              height,
              registerChild,
              onChildScroll,
              scrollTop,
              isScrolling,
            }) => (
                 <div
                    ref={registerChild}
                    className={classNames(
                      classes.ArticleList,
                      {},
                      [className, classes[view]],
                    )}
                 >
                      <List
                         height={height ?? 700}
                         rowCount={rowCount}
                         rowHeight={isList ? 700 : 330}
                         rowRenderer={rowRenderer}
                         width={width ? width - 80 : 700}
                         autoHeight
                         onScroll={onChildScroll}
                         scrollTop={scrollTop}
                         isScrolling={isScrolling}
                      />
                      {isLoading && getSkeletons(view)}
                 </div>
            )}
       </WindowScroller>
  );
});
