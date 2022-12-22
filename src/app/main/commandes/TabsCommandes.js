import React, {  useEffect, useState } from 'react';
import Table from "../sharedComponent/Table";
import { Button } from "@material-ui/core";
import { Tabs } from "@yazanaabed/react-tabs";
import Request from "../../utils/Request";
import env from '../../static';
import Moment from "react-moment";


function TabsCommandes(props) {
    const [state, setState] = useState({ tableRef: React.createRef() })
    const columns = [
        {
            title: "Code commande", field: "code"
        },
        {
            title: "Piece Demandé", render: rowData => (
                rowData.piece?._id ?
                    <div>
                        <p style={{ padding: 0, margin: 0 }}><b>Nom Piece:</b> {rowData.piece.name}</p>
                        <p style={{ padding: 0, margin: 0 }}><b>Réparateur:</b> {rowData.piece.postedBy.fname} {rowData.piece.postedBy.lname}</p>
                        <p style={{ padding: 0, margin: 0 }}><b>Prix:</b> {rowData.piece.price}</p>
                        <p style={{ padding: 0, margin: 0 }}><b>Quantité Disponible:</b> {rowData.piece.quantity}</p>
                    </div>
                    :
                    <div>-</div>
            ),
        },
        {
            title: "Réparateur", render: (rowData) => (
                <div>
                    <p style={{ padding: 0, margin: 0 }}><b>Nom:</b> {rowData.orderBy.fname} {rowData.orderBy.lname}</p>
                    <p style={{ padding: 0, margin: 0 }}><b>Email:</b> {rowData.orderBy.email}</p>
                    <p style={{ padding: 0, margin: 0 }}><b>Phone:</b> {rowData.orderBy.phone}</p>
                </div>
            )
        },
        { title: "Quantité demandé", render: rowData => <p>{rowData.quantity}</p> },
        { title: "Date commande", render: rowData => (<Moment format={'llll'} locale={'fr'}>{rowData.created_at}</Moment>), type: "date" },
        {
            title: "Actions", render: rowData => (
                <div>
                    {
                        rowData.traiter ?
                            <Button
                                onClick={() => { annulOrder(rowData._id) }}
                                variant="contained"
                                color="primary"
                                style={{ background: 'gray', marginTop: 10, width: '100%' }}
                            >
                                Annuler
                            </Button>
                            :
                            <>
                                <Button
                                    onClick={() => { acceptOne(rowData._id) }}
                                    disabled={rowData.quantity > rowData.piece.quantity}
                                    variant="contained"
                                    color="primary"
                                    style={{ background: rowData.quantity > rowData.piece.quantity ? '#1C1A1F30' : 'green', marginTop: 10, width: '100%' }}
                                >
                                    Accepter
                                </Button>
                                <br />
                                <Button
                                    onClick={() => { rejectOne(rowData._id) }}
                                    style={{ background: 'red', marginTop: 10, width: '100%' }}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Rejeter
                                </Button>
                            </>
                    }
                </div>
            )
        }
    ]
    const [orders, setOrders] = React.useState([]);
    const request = new Request();
    const rejectOrder = async (id) => {
        const data = await request.update(env.stock.reject_order, { id });
        if (data.error) {
            return alert(data.message);
        }
        return setOrders(orders.map(order => order._id === id ? { ...order, traiter: true, status: 'Annulé' } : order));
    };
    const acceptOrder = async (id) => {
        const data = await request.update(env.stock.accept_order, { id });
        if (data.error) {
            return alert(data.message);
        }
        return setOrders(orders.map(order => order._id === id ? { ...order, traiter: true, status: 'Accepté' } : order));
    };

    const annulOrder = async (id) => {
        const data = await request.update(env.stock.reset_order, { id });
        if (data.error) {
            return alert(data.message);
        }
        return setOrders(orders.map(order => order._id === id ? { ...order, traiter: false, status: 'En Attente' } : order));
    };
    useEffect(() => {
        const query = {
            error: undefined,
            filters: [],
            orderBy: undefined,
            orderDirection: "",
            page: 0,
            pageSize: 10,
            search: "",
            totalCount: 26
        }
        fetchData(query).then(res => setOrders(res.data))
            .catch(e => console.log(e))

    }, [])//DidMount

    const fetchData = (query) => {
        return new Promise(async (resolve, reject) => {
            let url = env.stock.list_commandes + "?";
            url += "page=" + (query.page + 1);
            url += "&count=" + query.pageSize;
            url += "&search=" + query.search;
            if (query.filters.length > 0) {
                query.filters.forEach(elem => {
                    url += `&filters[]=${elem.column.field},${elem.value}`;
                });
            } else {
                url += "&filters=";
            }
            try {
                const result = await request.getAll(url);
                let dataList = [];
                result.data.data.forEach(element => {
                    dataList.push({
                        ...element,
                    });
                });
                resolve({
                    data: dataList,
                    page: Number(result.data.page) - 1,
                    totalCount: result.data.totalCount
                });
            } catch (e) {
                if (e.response) {
                    props.enqueueSnackbar(e.response.data.message, {
                        variant: "error"
                    });
                } else {
                    props.enqueueSnackbar(e.message, {
                        variant: "error"
                    });
                }
            }
        });
    }
    const handleDelete = async (event, rowId) => {
        try {
            const url = env.stock.remove_order;
            await request.new(url, rowId.map(row => row._id));
            state.tableRef.current.onQueryChange();

            props.enqueueSnackbar("Operation reussi avec succes", {
                variant: "success"
            });
        } catch (e) {
            if (e.response) {
                props.enqueueSnackbar(e.response.data.message, {
                    variant: "error"
                });
            } else {
                props.enqueueSnackbar(e.message, {
                    variant: "error"
                });
            }
        }
    }

    return (
        <div>
            <Tabs
                activeTab={{
                    id: "tab1"
                }}
            >

                <Tabs.Tab id="tab1" title={`En attente `}>

                    <Table
                        rewriteAction={true}
                        actions={[
                            rowData => (
                                {
                                    tooltip: "Remove All Selected Requests",
                                    icon: "delete",
                                    onClick: handleDelete
                                }
                            ),
                        ]}
                        title="List des commandes en attente"
                        columns={columns}
                        data={orders.filter(order => order.status == 'En Attente')}
                        pageSize={10}
                        delete={handleDelete}
                        state={state}
                        rowStyle={(rowData) => rowData.traiter ? { background: rowData.status == 'Accepté' ? '#00ff7526' : '#ff000024' } : { background: '#f39c1225' }}
                    />
                </Tabs.Tab>
                <Tabs.Tab id="tab2" title={`Acceptées `}>
                    <Table
                        rewriteAction={true}
                        actions={[
                            rowData => (
                                {
                                    tooltip: "Remove All Selected Requests",
                                    icon: "delete",
                                    onClick: handleDelete
                                }
                            ),
                        ]}
                        title="List des commandes acceptées"
                        columns={columns}
                        data={orders.filter(order => order.status == 'Accepté')}
                        delete={handleDelete}
                        state={state}
                        pageSize={10}
                        rowStyle={(rowData) => rowData.traiter ? { background: rowData.status == 'Accepté' ? '#00ff7526' : '#ff000024' } : { background: '#f39c1225' }}
                    />
                </Tabs.Tab>
                <Tabs.Tab id="tab3" title={`Rejetées `}>

                    <Table
                        rewriteAction={true}
                        actions={[
                            rowData => (
                                {
                                    tooltip: "Remove All Selected Requests",
                                    icon: "delete",
                                    onClick: handleDelete
                                }
                            ),
                        ]}
                        title="List des commandes rejetées"
                        columns={columns}
                        data={orders.filter(order => order.status == 'Annulé')}
                        delete={handleDelete}
                        state={state}
                        pageSize={10}
                        rowStyle={(rowData) => rowData.traiter ? { background: rowData.status == 'Annulé' ? '#00ff7526' : '#ff000024' } : { background: '#f39c1225' }}
                    />

                </Tabs.Tab>
            </Tabs>
        </div>
    );
}

export default TabsCommandes;
