import React from 'react';
import Table from "../sharedComponent/Table";
import MaterialTable from "material-table";
import {Badge, Button} from "@material-ui/core";
import { Tabs } from "@yazanaabed/react-tabs";
import Formsy from "formsy-react";
import Request from "../../utils/Request";
import env from '../../static';
function TabsComments(props) {
    const [comments, setComments] = React.useState(props.comments || []);
    const request = new Request();
    const rejectComment = async (id) => {
        const data = await request.update(env.blog.commentAction, {action: -1, id});
        if (data.error) {
            return alert(data.message);
        }
        return setComments(comments.map(comment => comment._id === id ? {...comment, validated: false, rejected: true} : comment));
    };
    const validate = async (id) => {
        const data = await request.update(env.blog.commentAction, {action: 1, id});
        if (data.error) {
            return alert(data.message);
        }
        return setComments(comments.map(comment => comment._id === id ? {...comment, validated: true, rejected: false} : comment));
    };
    return (
        <div>
            <Tabs
                activeTab={{
                    id: "tab1"
                }}
            >
                <Tabs.Tab id="tab1" title={`En attente - (${comments.filter(comment => !comment.validated && !comment.rejected).length})`}>
                    <MaterialTable title={'Commentaires'} style={{width: '80vw'}} columns={[
                        { title: 'Nom et Prénom', field: 'fullName'},
                        { title: 'Email', field: 'email'},
                        { title: 'Commentaire', field: 'content'},
                        { title: 'Action', field: '', render: rowData => (<div style={{flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-around'}}>
                                <Button
                                    variant="contained"
                                    onClick={() => validate(rowData._id)}
                                    size={'large'}
                                    color="secondary"
                                >
                                    {'Valider'}
                                </Button>
                                <Button
                                    size={'large'}
                                    variant="contained"
                                    color="primary"

                                    onClick={() => rejectComment(rowData._id)}
                                >
                                    {'Réfuser'}
                                </Button>
                            </div>)}
                    ]} data={comments.filter(comment => !comment.validated && !comment.rejected)}/>
                </Tabs.Tab>
                <Tabs.Tab id="tab2" title={`Accepté - (${comments.filter(comment => !comment.rejected && comment.validated).length})`}>
                    <MaterialTable title={'Commentaires'} style={{width: '80vw'}} columns={[
                        { title: 'Nom et Prénom', field: 'fullName'},
                        { title: 'Email', field: 'email'},
                        { title: 'Commentaire', field: 'content'},
                        { title: 'Action', field: '', render: rowData => (<div style={{flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-around'}}>
                                <Button
                                    size={'large'}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => rejectComment(rowData._id)}
                                >
                                    {'Réfuser'}
                                </Button>
                            </div>)}
                    ]} data={comments.filter(comment => !comment.rejected && comment.validated)}/>
                </Tabs.Tab>
                <Tabs.Tab id="tab3" title={`Rejetée - (${comments.filter(comment => !comment.validated && comment.rejected).length})`}>
                    <MaterialTable title={'Commentaires'} style={{width: '80vw'}} columns={[
                        { title: 'Nom et Prénom', field: 'fullName'},
                        { title: 'Email', field: 'email'},
                        { title: 'Commentaire', field: 'content'},
                        { title: 'Action', field: '', render: rowData => (<div style={{flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-around'}}>
                                <Button
                                    variant="contained"
                                    onClick={() => validate(rowData._id)}
                                    size={'large'}
                                    color="secondary"
                                >
                                    {'Valider'}
                                </Button>
                            </div>)}
                    ]} data={comments.filter(comment => !comment.validated && comment.rejected)}/>
                </Tabs.Tab>
            </Tabs>
        </div>
    );
}

export default TabsComments;
