import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useRef, useState } from 'react';
import KontragentService from "../../../api/services/kontragent-service";


export const KontragentsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
        ...props
}) => {
    const [kontragent, setKontragent] = useState(null);

    useEffect(() => {
        if (currentRecord) {
          setKontragent(currentRecord);
        } else {
          setKontragent(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record = 
            currentRecord
                ? await KontragentService.updateRecord({
                    id: currentRecord.id,
                    ...kontragent,
                })
                : await KontragentService.createRecord(kontragent)
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
                    value={kontragent?.title || ''}
                    onChange={e => setKontragent({ ...kontragent, title: e.target.value })}
                    placeholder="Укажите наименование"
                />

                <Input
                    value={kontragent?.inn || ''}
                    onChange={e => setKontragent({ ...kontragent, inn: e.target.value })}
                    placeholder="Укажите ИНН"
                />

                <Input
                    value={kontragent?.kpp || ''}
                    onChange={e => setKontragent({ ...kontragent, kpp: e.target.value })}
                    placeholder="Укажите КПП"
                />

                <Input
                    value={kontragent?.adres || ''}
                    onChange={e => setKontragent({ ...kontragent, adres: e.target.value })}
                    placeholder="Укажите адрес"
                />
                <Input
                    value={kontragent?.telephone || ''}
                    onChange={e => setKontragent({ ...kontragent, telephone: e.target.value })}
                    placeholder="Укажите телефон"
                />

                <Input
                    value={kontragent?.bank || ''}
                    onChange={e => setKontragent({ ...kontragent, bank: e.target.value })}
                    placeholder="Укажите банк"
                />
                <Input
                    value={kontragent?.bik || ''}
                    onChange={e => setKontragent({ ...kontragent, bik: e.target.value })}
                    placeholder="Укажите БИК"
                />

                <Input
                    value={kontragent?.korSchet || ''}
                    onChange={e => setKontragent({ ...kontragent, korSchet: e.target.value })}
                    placeholder="Укажите к/с"
                />

            </Space>

        </Modal>
    )
   
}
