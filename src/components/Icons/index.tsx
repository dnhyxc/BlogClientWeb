import React, { ReactNode } from 'react';
import classname from 'classname';
import styles from './index.less';

interface IProps {
  children?: ReactNode;
  name?: string;
  text?: string;
  className?: string;
}

const Icons: React.FC<IProps> = ({ children, text, name, className }) => {
  return (
    <span className={styles.Icons}>
      <span className={classname(className, `iconfont ${name}`)} />
      <span className={styles.child}>
        <span>{text}</span>
        <span>{children}</span>
      </span>
    </span>
  );
};

export default Icons;
