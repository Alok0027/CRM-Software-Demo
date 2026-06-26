import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { FiPlus } from 'react-icons/fi';
import Column from '../../components/Kanban/Column';
import TaskModal from '../../components/Kanban/TaskModal';

const initialTasks = {
    'todo': [
        { 
            id: '1', 
            title: 'Brand Identity Revision', 
            priority: 'High', 
            tags: ['Branding', 'Design'], 
            dueDate: '2023-08-15', 
            assignees: [{ id: 'u1', avatar: 'https://i.pravatar.cc/24?u=a042581f4e29026704d' }], 
            comments: [{id: 'c1', author: 'Jane', text: 'We need to finalize the logo by Friday.'}], 
            attachments: 2, 
            checklist: [
                { id: 'sub1', text: 'Research competitors', completed: true },
                { id: 'sub2', text: 'Sketch initial concepts', completed: false },
                { id: 'sub3', text: 'Create digital mockups', completed: false },
            ]
        },
    ],
    'inProgress': [
        { 
            id: '3', 
            title: 'User Authentication Flow', 
            priority: 'High', 
            tags: ['Development', 'Frontend'], 
            dueDate: '2023-08-10', 
            assignees: [{ id: 'u4', avatar: 'https://i.pravatar.cc/24?u=a042581f4e29026707d' }], 
            comments: [], 
            attachments: 4, 
            checklist: [
                { id: 'sub4', text: 'Design login page UI', completed: true },
                { id: 'sub5', text: 'Implement frontend logic', completed: true },
                { id: 'sub6', text: 'Connect to backend API', completed: false },
            ]
        },
    ],
    'review': [],
    'done': []
};

const initialColumns = [
    { id: 'todo', title: 'To-Do' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'review', title: 'In Review' },
    { id: 'done', title: 'Done' },
];

const Kanban = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [columns] = useState(initialColumns);
    const [isModalOpen, setIsModalOpen] = useState(false);
        const [editingTask, setEditingTask] = useState(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Require pointer to move 8px to start a drag
            },
        })
    );

    const findContainer = (id) => {
        if (id in tasks) {
            return id;
        }
        return Object.keys(tasks).find(key => tasks[key].some(item => item.id === id));
    };

        const handleOpenModal = (task = null) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

            const handleAddTask = (columnId) => {
        setEditingTask({ columnId: columnId });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleDeleteTask = (taskId) => {
        const container = findContainer(taskId);
        if (container) {
            setTasks(prev => ({
                ...prev,
                [container]: prev[container].filter(task => task.id !== taskId)
            }));
        }
    };

    const handleSaveTask = (taskData, newComment) => {
        if (newComment && taskData.id) {
            const container = findContainer(taskData.id);
            if (container) {
                setTasks(prev => ({
                    ...prev,
                    [container]: prev[container].map(t => 
                        t.id === taskData.id ? 
                        { ...t, comments: [...t.comments, { id: `c-${Date.now()}`, author: 'You', text: newComment }] } : t
                    )
                }));
            }
            return;
        }

        if (taskData.id) {
            const container = findContainer(taskData.id);
            if (container) {
                setTasks(prev => ({
                    ...prev,
                    [container]: prev[container].map(t => t.id === taskData.id ? { ...t, ...taskData } : t)
                }));
            }
        } else {
            const targetColumn = taskData.columnId || 'todo';
            const newTask = {
                ...taskData,
                id: `task-${Date.now()}`,
                assignees: [],
                comments: [],
                attachments: 0,
                checklist: [],
                tags: taskData.tags ? taskData.tags.split(',').map(t => t.trim()) : [],
            };
            setTasks(prev => ({
                ...prev,
                [targetColumn]: [newTask, ...(prev[targetColumn] || [])],
            }));
        }
        handleCloseModal();
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
             if (activeContainer) {
                setTasks(prev => {
                    const activeItems = prev[activeContainer];
                    const activeIndex = activeItems.findIndex(item => item.id === activeId);
                    const overIndex = activeItems.findIndex(item => item.id === overId);
                    return {
                        ...prev,
                        [activeContainer]: arrayMove(activeItems, activeIndex, overIndex)
                    };
                });
            }
            return;
        }

        setTasks(prev => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];
            const activeIndex = activeItems.findIndex(item => item.id === activeId);
            const overIndex = overItems.findIndex(item => item.id === overId);

            let newOverItems = [...overItems];
            const [movedItem] = activeItems.splice(activeIndex, 1);
            newOverItems.splice(overIndex, 0, movedItem);

            return {
                ...prev,
                [activeContainer]: [...activeItems],
                [overContainer]: newOverItems,
            };
        });
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen font-sans">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-medium text-gray-800">Kanban Board</h1>
                    <p className="text-gray-500">Manage your team's workflow and track progress.</p>
                </div>
                                                <button 
                    onClick={() => handleAddTask('todo')}
                    className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-normal hover:bg-orange-600 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                    <FiPlus />
                    Add New Task
                </button>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {columns.map(column => (
                        <Column 
                            key={column.id} 
                            id={column.id} 
                            title={column.title} 
                            tasks={tasks[column.id] || []} 
                                                        onEditTask={handleOpenModal}
                            onDeleteTask={handleDeleteTask}
                            onAddTask={handleAddTask}
                            
                        />
                    ))}
                </div>
            </DndContext>

            <TaskModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveTask}
                task={editingTask}
            />
        </div>
    );
};

export default Kanban;
