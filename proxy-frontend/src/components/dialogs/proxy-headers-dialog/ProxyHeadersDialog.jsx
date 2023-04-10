import { DatePicker, Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import ProxyHeadersService from "../../../api/services/proxy-header-service";

const { Option } = Select;

export const ProxyHeadersDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    individuals,
    organizations,
    ...props
}) => {
    const [proxyHeader, setProxyHeader] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setProxyHeader(currentRecord);
        } else {
            setProxyHeader(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await ProxyHeadersService.updateRecord({
                    id: currentRecord.id,
                    ...proxyHeader,
                })
                : await ProxyHeadersService.createRecord(proxyHeader)
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
                    value={proxyHeader?.number || ''}
                    onChange={e => setProxyHeader({ ...proxyHeader, number: e.target.value })}
                    placeholder="Укажите номер документа"
                />

                <Space style={{ width: '100%' }}>

                    <DatePicker
                        format={"YYYY-MM-DD"}
                        value={proxyHeader?.dischargeDate || null}
                        onChange={date => setProxyHeader({ ...proxyHeader, dischargeDate: date })}
                        placeholder={"Укажите дату выписки"}
                        style={{ width: 232 }}
                    />
 
                    <DatePicker
                        format={"YYYY-MM-DD"}
                        value={proxyHeader?.endDate || null}
                        onChange={date => setProxyHeader({ ...proxyHeader, endDate: date })}
                        placeholder={"Укажите дату окончания"}
                        style={{ width: 232 }}
                    />

                </Space>

                <Space style={{ width: '100%' }}>
                    <Select
                        value={proxyHeader?.individualId || null}
                        onChange={value => setProxyHeader({ ...proxyHeader, individualId: value })}
                        placeholder={"Выберите физ. лицо"}
                        style={{ width: 232 }}
                    >
                        {individuals.map(it => <Option
                            value={it.id}>
                            {it.firstName}
                        </Option>)}
                    </Select>

                    <Select
                        value={proxyHeader?.organizationId || null}
                        onChange={value => setProxyHeader({ ...proxyHeader, organizationId: value })}
                        placeholder={"Выберите организацию"}
                        style={{ width: 232 }}
                    >
                        {organizations.map(it => <Option
                            value={it.id}>
                            {it.title}
                        </Option>)}
                    </Select>

                </Space>

            </Space>
        </Modal>
    )
}
