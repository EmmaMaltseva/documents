import { DatePicker, Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import ProxyHeadersNakService from "../../../api/services/proxy-header-nak-service";
import moment from "moment"

const { Option } = Select;

export const ProxyHeadersNakDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    individuals,
    organizations,
    kontragents,
    ...props
}) => {
    const [proxyHeaderNak, setProxyHeaderNak] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setProxyHeaderNak(currentRecord);
        } else {
            setProxyHeaderNak(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await ProxyHeadersNakService.updateRecord({
                    id: currentRecord.id,
                    ...proxyHeaderNak,
                })
                : await ProxyHeadersNakService.createRecord(proxyHeaderNak)
        onOk(record);
    }

    return (
        <Modal
            visible={visible}
            title={currentRecord ? 'Редактировать' : 'Создать'}
            onOk={onOkHandler}
            onCancel={onCancel}
        >
            <Space direction="vertical" style={{ width: '100%'}}>

                <Space style={{ width: '100%' }}>
                    <Input
                        value={proxyHeaderNak?.number || ''}
                        onChange={e => setProxyHeaderNak({ ...proxyHeaderNak, number: e.target.value })}
                        placeholder="Укажите номер документа"
                    />
                    <DatePicker
                        format={"YYYY-MM-DD"}
                        value={proxyHeaderNak?.dateSost || null}
                        onChange={date => setProxyHeaderNak({ ...proxyHeaderNak, dateSost: date })}
                        placeholder={"Укажите дату составления"}
                        allowClear={false}
                        style={{ width: 232 }}
                    />
                </Space>
                <Space style={{ width: '100%' }}>

                    <Select
                        value={proxyHeaderNak?.organizGruzootpId || null}
                        onChange={value => setProxyHeaderNak({ ...proxyHeaderNak, organizGruzootpId: value })}
                        placeholder={"Выберите грузоотправителя"}
                        style={{ width: 232 }}
                    >
                        {organizations.map(it => <Option
                            value={it.id}>
                            {it.title}
                        </Option>)}
                    </Select>

                    <Select
                        value={proxyHeaderNak?.kontrGruzopolId || null}
                        onChange={value => setProxyHeaderNak({ ...proxyHeaderNak, kontrGruzopolId: value })}
                        placeholder={"Выберите грузополучателя"}
                        style={{ width: 232 }}
                    >
                        {kontragents.map(it => <Option
                            value={it.id}>
                            {it.title}
                        </Option>)}
                    </Select>
                </Space>
                <Space style={{ width: '100%' }}>
                    <Select
                        value={proxyHeaderNak?.organizPostavId || null}
                        onChange={value => setProxyHeaderNak({ ...proxyHeaderNak, organizPostavId: value })}
                        placeholder={"Выберите поставщика"}
                        style={{ width: 232 }}
                    >
                        {organizations.map(it => <Option
                            value={it.id}>
                            {it.title}
                        </Option>)}
                    </Select>

                    <Select
                        value={proxyHeaderNak?.kontrPlatId || null}
                        onChange={value => setProxyHeaderNak({ ...proxyHeaderNak, kontrPlatId: value })}
                        placeholder={"Выберите плательщика"}
                        style={{ width: 232 }}
                    >
                        {kontragents.map(it => <Option
                            value={it.id}>
                            {it.title}
                        </Option>)}
                    </Select>
                </Space>
                

                <Space style={{ width: '100%' }}>
                    <Input
                        value={proxyHeaderNak?.osnovan || ''}
                        onChange={e => setProxyHeaderNak({ ...proxyHeaderNak, osnovan: e.target.value })}
                        placeholder="Укажите основание"
                    />

                    <Input
                        value={proxyHeaderNak?.struktPodr || ''}
                        onChange={e => setProxyHeaderNak({ ...proxyHeaderNak, struktPodr: e.target.value })}
                        placeholder="Укажите структурное подразделение"
                    />
                </Space>

            </Space>
        </Modal>
    )
}
