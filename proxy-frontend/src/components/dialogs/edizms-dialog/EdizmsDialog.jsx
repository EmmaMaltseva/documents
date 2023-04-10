import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useRef, useState } from 'react';
import EdizmService from "../../../api/services/edizms-service";

export const EdizmsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [edizm, setEdizm] = useState('');

    useEffect(() => {
        if (currentRecord) {
          setEdizm(currentRecord.title);
        } else {
          setEdizm('');
        }
    }, [currentRecord])

    const onOkHandler = async () => {
      const record = 
          currentRecord
              ? await EdizmService.updateRecord({
                  id: currentRecord.id,
                  ...edizm,
              })
              : await EdizmService.createRecord(edizm)
      onOk(record);
  }

    return (
        <Modal
        visible={visible}
        title={currentRecord ? 'Редактировать' : 'Создать'}
        onOk={onOkHandler}
        onCancel={onCancel}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
                value={edizm?.edIzm || ''}
                onChange={e => setEdizm({...edizm, edIzm: e.target.value})}
                placeholder="Ед. изм."
            />

            <Input
                value={edizm?.okei || ''}
                onChange={e => setEdizm({...edizm, okei: e.target.value})}
                placeholder="Код по ОКЕИ"
              />
          </Space>
        </Modal>
    )
}



