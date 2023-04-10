import { DatePicker, Button, Space, Table, Select, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useParams } from "react-router";
import ProxyBodyNakService from "../../../api/services/proxy-body-nak-service";
import ProxyHeadersNakService from "../../../api/services/proxy-header-nak-service";
import OrganizationService from "../../../api/services/organization-service";
import KontragentService from "../../../api/services/kontragent-service";
import IndividualService from "../../../api/services/individuals-service";
import ProductService from "../../../api/services/product-service";
import EdizmService from "../../../api/services/edizms-service";
import { ProxyBodiesNakDialog } from "../../../components/dialogs/proxy-bodies-nak-dialog/ProxyBodiesNakDialog";
import { useReactToPrint } from "react-to-print";
import moment from "moment"


const { Option } = Select;

export const ProxyNakView = ({
    onOk,
    onClick,
    ...props
}) => {
    const columns = [
        {
            title: 'Номер по порядку',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Наименование',
            key: 'title',
            render: (text, record) => products.find(it => it.id === record.productId)?.title,
        },
        {
            title: 'Код',
            key: 'id',
            render: (text, record) => products.find(it => it.id === record.productId)?.id,
        },
        {
            title: 'Ед. изм.',
            key: 'edIzmId',
            render: (text, record) => edizms.find(it => it.id === record.edIzmId)?.edIzm,
        },
        {
            title: 'Код ОКЕИ',
            key: 'edIzmId',
            render: (text, record) => edizms.find(it => it.id === record.edIzmId)?.okei,
        },
        {
            title: 'Вид упаковки',
            dataIndex: 'vidUp',
            key: 'vidUp',
        },
        {
            title: 'Масса брутто',
            dataIndex: 'massaBr',
        },
        {
            title: 'Количество(масса нетто)',
            dataIndex: 'kol_massaNet',
        },
        {
            title: 'Цена, руб. коп.',
            key: 'priceId',
            render: (text, record) => products.find(it => it.id === record.productId)?.price,
        },
        {
            title: 'Сумма без учета НДС, руб. коп.',
            render: (text, record) => products.find(it => it.id === record.productId)?.price * record.kol_massaNet,
        },
        
        {
            title: 'Ставка НДС, %',
            dataIndex: 'stavkaNDS',
            key: 'stavkaNDS',
        },

        {
            title: 'Сумма НДС, руб. коп.',
            key: 'sumNDS',
            render: (text, record) => products.find(it => it.id === record.productId)?.price * record.kol_massaNet * record.stavkaNDS / 100,
        },

        {
            title: 'Сумма c учетом НДС, руб. коп.',
            key: 'sumSNDS',
            render: (text, record) => products.find(it => it.id === record.productId)?.price * record.kol_massaNet + products.find(it => it.id === record.productId)?.price * record.kol_massaNet * record.stavkaNDS / 100,
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

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const { id } = useParams();
    const [proxy, setProxy] = useState(null);
    const [list, setList] = useState([]);
    const [individuals, setIndividuals] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [kontragents, setKontragents] = useState([]);
    const [products, setProducts] = useState([]);
    const [edizms, setEdizms] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const proxy = await ProxyHeadersNakService.getOneRecord(id);
            const list = await ProxyBodyNakService.getAllHeadersRecords(id);
            const individuals = await IndividualService.getAllRecords();
            const organizations = await OrganizationService.getAllRecords();
            const kontragents = await KontragentService.getAllRecords();
            const products = await ProductService.getAllRecords();
            const edizms = await EdizmService.getAllRecords();

            setList(list);
            setProxy(proxy);

            setIndividuals(individuals);
            setOrganizations(organizations);
            setKontragents(kontragents);
            setProducts(products);
            setEdizms(edizms);


            return () => {
                setList([]);
                setProxy(null);

                setIndividuals([]);
                setOrganizations([]);
                setKontragents([]);
                setProducts([]);
                setEdizms([]);

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
        await ProxyBodyNakService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
    }

    return (
        <div style={{ padding: 16 }}>
            <div ref={componentRef}>

                <Space
                    direction={'vertical'}
                    align={'center'}
                    style={{ width: '100%', marginBottom: 24 }}
                >
                    <h2>Товарная накладная № <strong>{proxy?.number}</strong></h2>

                    <Space
                    >Дата составления
                        <DatePicker
                            format="YYYY-MM-DD"
                            value={moment(proxy?.dateSost) || null}
                            onChange={date => setProxy({ ...proxy, dateSost: date }, ProxyHeadersNakService.updateRecord({
                                ...proxy, dateSost: date
                            }))
                            }
                            style={{ width: 200 }}
                        />
                    </Space>

                    <Space>Грузоотправитель: <strong>
                        <Select
                            value={proxy?.organizGruzootpId || null}
                            onChange={value => setProxy({ ...proxy, organizGruzootpId: value }, ProxyHeadersNakService.updateRecord({
                                ...proxy, organizGruzootpId: value
                            }))
                            }
                            placeholder={"Выберите грузоотправителя"}
                            style={{ width: 1300 }}
                        >
                            {organizations.map(it => <Option
                                value={it.id}>
                                {it.title}, ИНН: {it.inn}, КПП: {it.kpp}, {it.adres}, тел: {it.telephone}, {it.bank}, БИК: {it.bik}, р/с {it.korSchet}
                            </Option>)}
                        </Select>
                    </strong></Space>

                    <Space>Грузополучатель: <strong>
                        <Select
                            value={proxy?.kontrGruzopolId || null}
                            onChange={value => setProxy({ ...proxy, kontrGruzopolId: value }, ProxyHeadersNakService.updateRecord({
                                ...proxy, kontrGruzopolId: value
                            }))
                            }
                            placeholder={"Выберите получателя"}
                            style={{ width: 1300 }}
                        >
                            {kontragents.map(it => <Option
                                value={it.id}>
                                {it.title}, ИНН: {it.inn}, КПП: {it.kpp}, {it.adres}, тел: {it.telephone}, {it.bank}, БИК: {it.bik}, р/с {it.korSchet}
                            </Option>)}
                        </Select>
                    </strong></Space>

                    <Space>Поставщик: <strong>
                        <Select
                            value={proxy?.organizPostavId || null}
                            onChange={value => setProxy({ ...proxy, organizPostavId: value }, ProxyHeadersNakService.updateRecord({
                                ...proxy, organizPostavId: value
                            }))
                            }
                            placeholder={"Выберите поставщика"}
                            style={{ width: 1300 }}
                        >
                            {organizations.map(it => <Option
                                value={it.id}>
                                {it.title}, ИНН: {it.inn}, КПП: {it.kpp}, {it.adres}, тел: {it.telephone}, {it.bank}, БИК: {it.bik}, р/с {it.korSchet}
                            </Option>)}
                        </Select>
                    </strong></Space>

                    <Space>Плательщик: <strong>
                        <Select
                            value={proxy?.kontrPlatId || null}
                            onChange={value => setProxy({ ...proxy, kontrPlatId: value }, ProxyHeadersNakService.updateRecord({
                                ...proxy, kontrPlatId: value
                            }))
                            }
                            placeholder={"Выберите получателя"}
                            style={{ width: 1300 }}
                        >
                            {kontragents.map(it => <Option
                                value={it.id}>
                                {it.title}, ИНН: {it.inn}, КПП: {it.kpp}, {it.adres}, тел: {it.telephone}, {it.bank}, БИК: {it.bik}, р/с {it.korSchet}
                            </Option>)}
                        </Select>
                    </strong></Space>

                    <Space>Основание: <strong>
                        <Input
                            value={proxy?.osnovan || null}
                            onChange={value => setProxy({ ...proxy, osnovan: value }, ProxyHeadersNakService.updateRecord({
                                ...proxy, osnovan: value
                            }))
                            }
                            placeholder={"Основание"}
                            style={{ width: 600 }}
                        />
                    </strong></Space>
                </Space>

                <Table dataSource={list} columns={columns} />
            </div>

            <Space>
                <Button onClick={createRecordHandler}>
                    Создать
                </Button>
                <Button type="dashed" onClick={handlePrint}>
                    Печать
                </Button>
            </Space>

            <ProxyBodiesNakDialog
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
                products={products}
                edizms={edizms}
                proxyHeaderNakId={id}
            />
        </div>
    )
}
