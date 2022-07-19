import React, { useState } from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import useStore from '@/store';
import Header from '@/components/Header';
import Content from '@/components/Content';
import TuiEditor from '@/components/TuiEditor';
import * as Server from '@/service';
import ReleaseModel from './ReleaseModel';

import styles from './index.less';

interface IProps {}

const CreateArticle: React.FC<IProps> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { create } = useStore();

  const onGetMackdown = (mackdown: any) => {
    create.createMackdown(mackdown);
  };

  const onUploadFile = async () => {
    const res = await Server.upload({
      file: '',
    });

    console.log(res, 'res');
  };

  const renderRight = () => {
    return (
      <Button type="link" className={styles.release} onClick={() => setVisible(true)}>
        发布文章
      </Button>
    );
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div className={styles.container}>
      <Header needMenu right={renderRight()}>
        发布文章
      </Header>
      <Content>
        <TuiEditor onGetMackdown={onGetMackdown} />
      </Content>
      <ReleaseModel visible={visible} onCancel={onCancel} />
    </div>
  );
};

export default observer(CreateArticle);
