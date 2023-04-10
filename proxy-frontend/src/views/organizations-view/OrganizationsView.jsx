import { Space, Table, Button } from "antd";
import React, { useEffect,useState } from "react";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import OrganizationService from "../../api/services/organization-service";
import { OrganizationsDialog } from "../../components/dialogs/organizations-dialog/OrganizationsDialog";

    const s = require('./style.module.css');

    export const OrganizationsView = ({
        ...props
    }) => {
        const columns = [
            {
                title: 'Код',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Название организации',
                dataIndex: 'title',
                
            },
            {
                title: 'ИНН',
                dataIndex: 'inn',
                
            },
            {
                title: 'КПП',
                dataIndex: 'kpp',
                
            },
            {
                title: 'Адрес',
                dataIndex: 'adres',
                
            },
            {
                title: 'Телефон',
                dataIndex: 'telephone',
                
            },
            {
                title: 'Название банка',
                dataIndex: 'bank',
                
            },
            {
                title: 'БИК',
                dataIndex: 'bik',
                
            },
            {
                title: 'К/с',
                dataIndex: 'korSchet',
                
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
            const list = await OrganizationService.getAllRecords();
            setList(list);
            return () => setList([]);
        }
        fetchData();
    }, [])

    const createRecordHandler = () => {
        setCurrentRecord(null);
        setVisible(true);
    }

    const deleteRecordHandler = async(recordId) => {
        await OrganizationService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
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
        <OrganizationsDialog
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