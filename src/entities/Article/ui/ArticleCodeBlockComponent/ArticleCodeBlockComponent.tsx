import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Code } from 'shared/ui/Code/Code';
import { ArticleCodeBlock } from '../../model/types/Article';
import classes from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
  const { className, block } = props;
  return (
       <div className={classNames(classes.ArticleCodeBlockComponent, {}, [className])}>
            <Code codingLines={block.code} />
       </div>
  );
});
