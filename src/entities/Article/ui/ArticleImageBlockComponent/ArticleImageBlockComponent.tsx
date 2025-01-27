import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { ArticleImageBlock } from '../../model/types/Article';
import classes from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block?: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { className, block } = props;
  return (
       <div className={classNames('', {}, [className])}>
            <img
               src={block?.src}
               alt={block?.title}
               className={classes.img}
            />
            {block?.title && (
            <Text
               text={block.title}
               align={TextAlign.CENTER}
            />
            )}
       </div>
  );
});
