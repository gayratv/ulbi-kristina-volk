import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Text } from 'shared/ui/Text/Text';
import { ArticleTextBlock } from '../../model/types/Article';
import classes from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string;
  block?: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
  const { block, className } = props;

  return (
       <div className={classNames(classes.ArticleTextBlockComponent, {}, [className])}>
            { block?.title && (
            <Text title={block.title} className={classes.title} />
            )}
            {block?.paragraphs.map((paragraph) => (
                 <Text
                    key={paragraph}
                    text={paragraph}
                    className={classes.paragraph}
                 />
            ))}
       </div>
  );
});
