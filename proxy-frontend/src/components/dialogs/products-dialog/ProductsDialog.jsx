import { DatePicker, Input, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import ProductsService from "../../../api/services/product-service";

const { Option } = Select;

export const ProductsDialog = ({
    visible,
    onOk,
    onCancel,
    currentRecord,
    ...props
}) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (currentRecord) {
            setProduct(currentRecord);
        } else {
            setProduct(null);
        }
    }, [currentRecord])

    const onOkHandler = async () => {
        const record =
            currentRecord
                ? await ProductsService.updateRecord({
                    id: currentRecord.id,
                    ...product,
                })
                : await ProductsService.createRecord(product)
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
                    value={product?.title || ''}
                    onChange={e => setProduct({ ...product, title: e.target.value })}
                    placeholder="Укажите наименование"
                />

                <Input
                    value={product?.price || ''}
                    onChange={e => setProduct({ ...product, price: e.target.value })}
                    placeholder="Укажите цену"
                />
                <Input
                    value={product?.edIzm || ''}
                    onChange={e => setProduct({ ...product, edIzm: e.target.value })}
                    placeholder="Укажите ед. изм."
                />

            </Space>
        </Modal>
    )
}



