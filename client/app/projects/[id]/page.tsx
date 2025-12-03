"use client"

import React, { useState, useEffect } from 'react'
import ProjectHeader from '../ProjectHeader'
import BoardView from '../BoardView';
import ListView from '../ListView';
import { useParams } from 'next/navigation';
import TimelineView from '../TimelineView';
import TableView from '../TableView';

// type Props = {
//     params: { id: string };
// }

const Project = () => {
    const params = useParams();
    const id = params.id as string;
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  return (
    <div>
        <ProjectHeader 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
        { activeTab === "Board" && (
            <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        { activeTab === "List" && (
            <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === "Timeline" && (
            <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === "Table" && (
            <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
    </div>
  )
}

export default Project;