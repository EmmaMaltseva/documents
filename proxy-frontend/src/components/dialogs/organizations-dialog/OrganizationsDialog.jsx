import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useRef, useState } from 'react';
import OrganizationService from "../../../api/services/organization-service";


export const OrganizationsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
        ...props
}) => {
    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setOrganization(currentRecord);
        } else {
            setOrganization(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record = 
            currentRecord
                ? await OrganizationService.updateRecord({
                    id: currentRecord.id,
                    ...organization,
                })
                : await OrganizationService.createRecord(organization)
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
                    value={organization?.title || ''}
                    onChange={e => setOrganization({ ...organization, title: e.target.value })}
                    placeholder="Укажите наименование"
                />

                <Input
                    value={organization?.inn || ''}
                    onChange={e => setOrganization({ ...organization, inn: e.target.value })}
                    placeholder="Укажите ИНН"
                />
                <Input
                    value={organization?.kpp || ''}
                    onChange={e => setOrganization({ ...organization, kpp: e.target.value })}
                    placeholder="Укажите КПП"
                />

                <Input
                    value={organization?.adres || ''}
                    onChange={e => setOrganization({ ...organization, adres: e.target.value })}
                    placeholder="Укажите адрес"
                />
                <Input
                    value={organization?.telephone || ''}
                    onChange={e => setOrganization({ ...organization, telephone: e.target.value })}
                    placeholder="Укажите телефон"
                />

                <Input
                    value={organization?.bank || ''}
                    onChange={e => setOrganization({ ...organization, bank: e.target.value })}
                    placeholder="Укажите банк"
                />
                <Input
                    value={organization?.bik || ''}
                    onChange={e => setOrganization({ ...organization, bik: e.target.value })}
                    placeholder="Укажите БИК"
                />

                <Input
                    value={organization?.korSchet || ''}
                    onChange={e => setOrganization({ ...organization, korSchet: e.target.value })}
                    placeholder="Укажите к/с"
                />
            </Space>

        </Modal>
    )
   
}
