import React, { useEffect, useState } from 'react';

import { Tabs } from "@yazanaabed/react-tabs";

import ReparationTable from './ReparationTable';
import ReparationTableAcquisition from './ReparationTableAcquisiton';
import ReparationTablePending from './ReparationTablePending';
import ReparationTableSAV from './ReparationTableSAV';
import ReparationTableB2B from './ReparationTableB2B';
import ReparationTableCS from './ReparationTableCS';
import ReparationTableSorties from './ReparationTableSorties';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 50,
    p: 4,
};

function TabsReparations({...props}) {

    return (
        <div>
            <Tabs
                activeTab={{
                    id: "tab1"
                }}
            >

                <Tabs.Tab id="tab1" title={`Tous `}>
                <ReparationTable />
                </Tabs.Tab>
                <Tabs.Tab id="tab2" title={`Acquisitions`}>
                <ReparationTableAcquisition />
               </Tabs.Tab>
                <Tabs.Tab id="tab3" title={`CS`}>
                <ReparationTableCS />
                </Tabs.Tab>
                <Tabs.Tab id="tab4" title={`En Attente`}>
                <ReparationTablePending />
                </Tabs.Tab>
                <Tabs.Tab id="tab5" title={`Retours`}>
                <ReparationTableSAV/>
                </Tabs.Tab>
                <Tabs.Tab id="tab6" title={`B2B`}>
                <ReparationTableB2B/>
                </Tabs.Tab>
                <Tabs.Tab id="tab7" title={`Sorties`}>
                <ReparationTableSorties/>
                </Tabs.Tab>
            </Tabs>
            
        </div>
    );
}

export default TabsReparations;
