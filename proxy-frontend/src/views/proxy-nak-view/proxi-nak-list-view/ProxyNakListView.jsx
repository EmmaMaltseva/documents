import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import OrganizationService from "../../../api/services/organization-service";
import kontragentService from "../../../api/services/kontragent-service";
import ProxyHeadersNakService from "../../../api/services/proxy-header-nak-service";
import IndividualService from "../../../api/services/individuals-service";
import { ProxyHeadersNakDialog } from "../../../components/dialogs/proxy-headers-nak-dialog/ProxyHeadersNakDialog";
import { useNavigate } from "react-router";


export const ProxyListNakView = ({
    ...props
}) => {
    const columns = [
        {
            title: 'Код',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Номер',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Дата составления',
            dataIndex: 'dateSost',
            key: 'dateSost',
        },
        {
            title: 'Грузоотправитель',
            dataIndex: 'organizGruzootpId',
            render: (text, record) => organizations.find(it => it.id === record.organizGruzootpId)?.title,
        },
        {
            title: 'Грузополучатель',
            dataIndex: 'kontrGruzopolId',
            render: (text, record) => kontragents.find(it => it.id === record.kontrGruzopolId)?.title,
        },
        {
            title: 'Поставщик',
            dataIndex: 'organizPostavId',
            render: (text, record) => organizations.find(it => it.id === record.organizPostavId)?.title,
        },
        {
            title: 'Плательщик',
            dataIndex: 'kontrPlatId',
            render: (text, record) => kontragents.find(it => it.id === record.kontrPlatId)?.title,
        },
        {
            title: 'Основание',
            dataIndex: 'osnovan',
            key: 'osnovan',
        },
        {
            title: 'Структурное подразделение',
            dataIndex: 'struktPodr',
            key: 'struktPodr',
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

    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [visible, setVisible] = useState(false);

    const [individuals, setIndividuals] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [kontragents, setKontragents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const individuals = await IndividualService.getAllRecords();
            const organizations = await OrganizationService.getAllRecords();
            const kontragents = await kontragentService.getAllRecords();
            const list = await ProxyHeadersNakService.getAllRecords();
            setIndividuals(individuals);
            setOrganizations(organizations);
            setKontragents(kontragents);
            setList(list);
            return () => {
                setList([]);
                setIndividuals([]);
                setOrganizations([]);
                setKontragents([]);
            };
        }
        fetchData();
    }, []);

    const createRecordHandler = () => {
        setCurrentRecord(null)
        setVisible(true);
    }

    const updateRecordHandler = (record) => {
        setCurrentRecord(record)
        setVisible(true)
    }

    const deleteRecordHandler = async (recordId) => {
        await ProxyHeadersNakService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
    }

    return (
        <div style={{ padding: 16 }}>
            <Table
                dataSource={list}
                columns={columns}
                onRow={(record, rowIndex) => ({
                    onDoubleClick: event => {
                        navigate(`/proxy-nak/${record.id}`);
                    },
                })}
            />
            <Button onClick={createRecordHandler}>
                Создать
            </Button>
            <ProxyHeadersNakDialog
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
                individuals={individuals}
                organizations={organizations}
                kontragents={kontragents}
            />
        </div>
    )
}