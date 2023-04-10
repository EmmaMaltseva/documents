import { Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import ProxyBodyNakService from "../../../api/services/proxy-body-nak-service";

const { Option } = Select;

export const ProxyBodiesNakDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    products,
    edizms,
    proxyHeaderNakId,
    ...props
}) => {
    const [proxyBodyNak, setProxyBodyNak] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setProxyBodyNak(currentRecord);
        } else {
            setProxyBodyNak(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await ProxyBodyNakService.updateRecord({
                    id: currentRecord.id,
                    ...proxyBodyNak,
                })
                : await ProxyBodyNakService.createRecord({...proxyBodyNak, proxyHeaderNakId})
        onOk(record);
    }

    return (
        <Modal
            visible={visible}
            title={currentRecord ? 'Редактировать' : 'Создать'}
            onOk={onOkHandler}
            onCancel={onCancel}
        >
            <Space direction="vertical">

                <Input
                    value={proxyBodyNak?.number || ''}
                    onChange={e => setProxyBodyNak({ ...proxyBodyNak, number: e.target.value })}
                    placeholder="Номер по порядку"
                />
                
                <Select
                    value={proxyBodyNak?.productId || null}
                    onChange={value => setProxyBodyNak({...proxyBodyNak, productId: value})}
                    placeholder={"Выберите продукт"}
                    style={{ width: '100%' }}
                >
                    {products.map(it => <Option
                        value={it.id}>
                        {it.title}
                    </Option>)}

                </Select>

                <Select
                    value={proxyBodyNak?.edIzmId || null}
                    onChange={value => setProxyBodyNak({...proxyBodyNak, edIzmId: value})}
                    placeholder={"Выберите ед. изм."}
                    style={{ width: '100%' }}
                >
                    {edizms.map(it => <Option
                        value={it.id}>
                        {it.edIzm}
                    </Option>)}

                </Select>

                <Input
                    value={proxyBodyNak?.vidUp || ''}
                    onChange={e => setProxyBodyNak({ ...proxyBodyNak, vidUp: e.target.value })}
                    placeholder="Вид упаковки"
                />

                <Input
                    value={proxyBodyNak?.kolVOdnom || ''}
                    onChange={e => setProxyBodyNak({ ...proxyBodyNak, kolVOdnom: e.target.value })}
                    placeholder="Кол. в одном месте"
                />

                <Input
                    value={proxyBodyNak?.kolMest || ''}
                    onChange={e => setProxyBodyNak({ ...proxyBodyNak, kolMest: e.target.value })}
                    placeholder="Кол. мест/штук"
                />

                <Input
                    value={proxyBodyNak?.massaBr || ''}
                    onChange={e => setProxyBodyNak({ ...proxyBodyNak, massaBr: e.target.value })}
                    placeholder="Масса брутто"
                />

                <Input
                    value={proxyBodyNak?.kol_massaNet || ''}
                    onChange={e => setProxyBodyNak({ ...proxyBodyNak, kol_massaNet: e.target.value })}
                    placeholder="Количество(масса нетто)"
                />

                <Input
                    value={proxyBodyNak?.stavkaNDS || ''}
                    onChange={e => setProxyBodyNak({ ...proxyBodyNak, stavkaNDS: e.target.value })}
                    placeholder="Ставка НДС"
                />

            </Space>

        </Modal>
    )
}
