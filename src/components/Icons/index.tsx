import React, { ReactNode } from 'react';
import classname from 'classname';
import styles from './index.less';

interface IProps {
  children?: ReactNode;
  name?: string;
  text?: string | number;
  className?: string;
  iconWrapClass?: string;
  onClick?: () => void;
}

const Icons: React.FC<IProps> = ({
  children,
  text,
  name,
  className,
  iconWrapClass,
  onClick,
}) => {
  return (
    <span className={classname(styles.Icons, iconWrapClass)} onClick={onClick}>
      <span className={classname(className, `iconfont ${name}`)} />
      {(text || children) && (
        <span className={styles.child}>
          {text && <span>{text}</span>}
          {children && <span>{children}</span>}
        </span>
      )}
    </span>
  );
};

export default Icons;
