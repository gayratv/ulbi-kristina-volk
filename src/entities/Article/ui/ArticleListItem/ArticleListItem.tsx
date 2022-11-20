import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import { useHover } from 'shared/lib/hooks/useHover/useHover';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import {
  ArticleTextBlockComponent,
} from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { RoutePaths } from 'shared/config/routes/routes';
import { useNavigate } from 'react-router-dom';
import {
  Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/Article';
import classes from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    className?: string;
    article: Article
	view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const [isHovered, bindHover] = useHover();
  const { t } = useTranslation('article');
  const articleTypes = <Text text={article.type.join(', ')} className={classes.types} />;
  const articleViews = <Text text={String(article.views)} className={classes.views} />;
  const articleImage = <img src={article.img} className={classes.img} alt={article.title} />;
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(RoutePaths.articles_details + article.id);
    console.log(isHovered);
  }, [isHovered, article.id, navigate]);

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (textBlock) => textBlock.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
         <div className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}>
              <Card className={classes.card}>
                   <div className={classes.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={classes.username} />
                        <Text text={article.createdAt} className={classes.date} />
                   </div>
                   <Text title={article.title} className={classes.title} />
                   {articleTypes}
                   {articleImage}

                   {textBlock
                     && (
                     <ArticleTextBlockComponent
                        block={textBlock}
                        className={classes.textBlock}
                     />
                     )}

                   <div className={classes.footer}>
                        <Button
                           onClick={onOpenArticle}
                           theme={ButtonTheme.CREATIVE}
                        >
                             {t('read-more')}
                        </Button>
                        {articleViews}
                   </div>
              </Card>
         </div>
    );
  }

  return (
       <div
          {...bindHover}
          className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}
       >
            <Card className={classes.card} onClick={onOpenArticle}>
                 <div className={classes.wrapperImage}>
                      {articleImage}
                      <Text text={article.createdAt} className={classes.date} />
                 </div>
                 <div className={classes.wrapperInfo}>
                      {articleTypes}
                      {articleViews}
                      <Icon Svg={EyeIcon} />
                 </div>
                 <Text text={article.title} className={classes.title} />
            </Card>
       </div>
  );
});