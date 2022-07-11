import React, { ReactNode } from 'react';
import classname from 'classname';
import styles from './index.less';

interface IProps {
  children?: ReactNode;
  name?: string;
  text?: string | number;
  className?: string;
  iconWrapClass?: string;
}

const Icons: React.FC<IProps> = ({
  children,
  text,
  name,
  className,
  iconWrapClass,
}) => {
  return (
    <span className={classname(styles.Icons, iconWrapClass)}>
      <span className={classname(className, `iconfont ${name}`)} />
      <span className={styles.child}>
        <span>{text}</span>
        <span>{children}</span>
      </span>
    </span>
  );
};

export default Icons;
