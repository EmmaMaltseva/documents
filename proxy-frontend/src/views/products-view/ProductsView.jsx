import { Space, Table, Button } from "antd";
import React, { useEffect,useState } from "react";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import ProductService from "../../api/services/product-service";
import { ProductsDialog } from "../../components/dialogs/products-dialog/ProductsDialog";
   
    const s = require('./style.module.css');

    export const ProductsView = ({
        ...props
    }) => {
         /**
         *  локальное состояние компонента
         *  здесь будет храниться список товаров
         */
         const columns = [
            {
                title: 'Код',
                dataIndex: 'id',
                key: 'id',
            },

            {
                title: 'Наименование',
                dataIndex: 'title',
                key: 'title',
            },

            {
                title: 'Цена',
                dataIndex: 'price',
                key: 'price',
            },

            {
                title: 'Ед. изм.',
                dataIndex: 'edIzm',
                key: 'edIzm',
            },

            {
                title: 'Действия',
                key: 'actions',
                render: (text, record) => {
                    return (
                        <Space size="middle">
                    <div onClick={() => updateRecordHandler(record)}>
                <EditOutlined />
                    </div>
                    <div onClick={() => deleteRecordHandler(record.id)}>
                        <DeleteOutlined />
                    </div>
                        </Space>
                    )
                }
            }
            
        ];

        const [list, setList] = useState([]);
        const [currentRecord, setCurrentRecord] = useState(null);
        const [visible, setVisible] = useState(false);

        useEffect( () => {
            async function fetchData() {
                const list = await ProductService.getAllRecords();
                setList(list);
                return () => setList([]);
            }
            fetchData();
        }, [])

        
        const deleteRecordHandler = async(recordId) => {
            await ProductService.removeRecord(recordId);
            setList(list.filter(it => it.id !== recordId));
        }    

        const createRecordHandler = () => {
            setCurrentRecord(null)
            setVisible(true);
        }

        const updateRecordHandler = (record) => {
            setCurrentRecord(record)
            setVisible(true)
        }

            return (
                <div style={{ padding: 16 }}>
            <Table dataSource={list} columns={columns} />
            <Button onClick={createRecordHandler}>
                Создать
            </Button>
            <ProductsDialog
                visible={visible}
                onOk={(record) => {
                    currentRecord
                        ? setList(list.map(it => it.id === currentRecord.id
                            ? { ...record }
                            : it))
                        : setList([...list, record]);

                    setCurrentRecord(null);
                    setVisible(false);
                }}
                onCancel={() => setVisible(false)}
                currentRecord={currentRecord}
                    />
                </div>
            )
    
    }
