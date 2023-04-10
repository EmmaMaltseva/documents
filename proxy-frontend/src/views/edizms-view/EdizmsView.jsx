import React from "react";
import { useState, useEffect } from 'react';
import {Input, Space, Button, Table, Modal} from "antd";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import EdizmsService from "../../api/services/edizms-service";
import { EdizmsDialog } from "../../components/dialogs/edizms-dialog/EdizmsDialog";
    
export const EdizmsView = ({
        ...props
}) => {

    const columns = [
        {
            title: 'Код',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Единица измерения',
            dataIndex: 'edIzm',
        },
        {
            title: 'Код по ОКЕИ',
            dataIndex: 'okei',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <div onClick={() => updateRecordHandler(record)}>
                            <EditOutlined/>
                        </div>
                        
                        <div onClick={() => deleteRecordHandler(record.id)}>
                            <DeleteOutlined/>
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
            const list = await EdizmsService.getAllRecords();
        setList(list);
        return () => setList([]);
        }
        fetchData();
    }, [])

    const createRecordHandler = () => {
        setCurrentRecord(null)
        setVisible(true);
    }

    const updateRecordHandler = (record) => {
        setCurrentRecord(record)
        setVisible(true)
    }

    const deleteRecordHandler = async(recordId) => {
        await EdizmsService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
    }


    return (
       <div style={{padding: 16}}>
            <Table dataSource={list} columns={columns}/>
            <Button onClick={createRecordHandler}>
            Создать
            </Button>
            <EdizmsDialog 
                visible={visible}
                onOk={(record) => {
                    currentRecord
                        ? setList(list.map(it => it.id === currentRecord.id
                            ? {...record }
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