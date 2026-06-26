import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiCheck, FiMoreVertical, FiUserPlus, FiShare2, FiEdit, FiCalendar, FiFlag, FiLayout, FiList, FiTag, FiChevronDown, FiPlay, FiSquare, FiClock, FiZap } from 'react-icons/fi';
import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskForm from '../components/Taskform';
import { format, isSameDay } from 'date-fns';
const initialTasks = [
  { id: 'task-1', text: 'Finalize Q3 marketing campaign materials', completed: false, dueDate: '2024-07-15', priority: 'High', assignedTo: { name: 'Jane Doe', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }, status: 'In Progress', subtasks: [{id: 'sub-1', text: 'Draft copy', completed: true}], comments: [{id: 'com-1', text: 'First draft looks good!', author: {name: 'John'}, timestamp: '2 hours ago'}], tags: ['Marketing', 'Urgent'], timeTracked: 0, isTracking: false, workload: 8 },
  { id: 'task-2', text: 'Develop new user onboarding flow for the app', completed: false, dueDate: '2024-07-20', priority: 'High', assignedTo: { name: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }, status: 'To-Do', subtasks: [], comments: [], tags: ['UX', 'Development'], workload: 13 },
  { id: 'task-3', text: 'Review and approve budget for next fiscal year', completed: true, dueDate: '2024-07-10', priority: 'Medium', assignedTo: { name: 'Peter Jones', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' }, status: 'Done', subtasks: [], comments: [], tags: ['Finance'], workload: 5 },
  { id: 'task-4', text: 'Organize team-building event for the engineering department', completed: false, dueDate: '2024-08-01', priority: 'Low', assignedTo: { name: 'Susan Lee', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' }, status: 'To-Do', subtasks: [], comments: [], tags: ['HR', 'Team Event'] },
  { id: 'task-5', text: 'Fix critical bug in the payment processing module', completed: false, dueDate: '2024-07-12', priority: 'High', assignedTo: { name: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }, status: 'In Progress', subtasks: [], comments: [], tags: ['Bugfix', 'Critical'] },
  { id: 'task-6', text: 'Update the customer-facing API documentation', completed: true, dueDate: '2024-07-08', priority: 'Medium', assignedTo: { name: 'Jane Doe', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }, status: 'Done', subtasks: [], comments: [], tags: ['Docs'] },
  { id: 'task-7', text: 'Research and evaluate new CRM software options', completed: false, dueDate: '2024-07-25', priority: 'Medium', assignedTo: { name: 'Peter Jones', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' }, status: 'Backlog', subtasks: [], comments: [], tags: ['Research'] },
];

const columns = ['Backlog', 'To-Do', 'In Progress', 'Done'];

const priorityColors = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Low: 'bg-orange-100 text-orange-700 border-orange-200',
};

const ActionMenu = ({ task, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-orange-100"><FiMoreVertical /></button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 border border-gray-100">
            <div className="py-1">
              <button onClick={() => { onEdit(task); setIsOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-100"><FiEdit /> Edit</button>
              <button onClick={() => { onDelete(task.id); setIsOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-orange-600 hover:bg-orange-50"><FiTrash2 /> Delete</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TaskItem = ({ task, onToggle, onEdit, onDelete, onSelect }) => (
  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`flex items-center p-4 mb-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border ${task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'}`}>
    <button onClick={() => onToggle(task.id)} className={`mr-4 p-1 rounded-full border-2 ${task.completed ? 'bg-green-500 border-orange-500' : 'border-gray-300 hover:border-orange-500'}`}>
      <FiCheck size={16} className={`${task.completed ? 'text-white' : 'text-transparent'}`} />
    </button>
    <div className="flex-grow cursor-pointer" onClick={() => onSelect(task)}>
      <p className={`font-medium ${task.completed ? 'line-through text-orange-500' : 'text-gray-800'}`}>{task.text}</p>
      <div className="flex items-center gap-4 text-xs text-orange-500 mt-1">
        <span className="flex items-center gap-1.5"><FiCalendar /> {task.dueDate}</span>
        <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs font-medium ${priorityColors[task.priority]}`}><FiFlag size={12} /> {task.priority}</span>
      </div>
      {task.tags && task.tags.length > 0 && (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {task.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">{tag}</span>
          ))}
        </div>
      )}
    </div>
    <div className="flex items-center gap-3 ml-4">
      <img src={task.assignedTo.avatar} alt={task.assignedTo.name} title={`Assigned to ${task.assignedTo.name}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
      <ActionMenu task={task} onEdit={onEdit} onDelete={onDelete} />
    </div>
  </motion.div>
);

const KanbanCard = ({ task, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={() => onSelect(task)} className="bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing">
      <p className="font-medium text-gray-800 text-sm mb-2">{task.text}</p>
      {task.tags && task.tags.length > 0 && (
        <div className="flex items-center gap-1.5 mt-2 flex-wrap mb-2">
          {task.tags.map(tag => (
            <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">{tag}</span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between text-xs text-orange-500">
        <span className="flex items-center gap-1"><FiCalendar size={12} /> {task.dueDate}</span>
        <span className={`px-2 py-0.5 rounded-md border text-xs font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
      </div>
      <div className="flex items-center justify-end mt-2">
         <img src={task.assignedTo.avatar} alt={task.assignedTo.name} title={`Assigned to ${task.assignedTo.name}`} className="w-6 h-6 rounded-full border-2 border-white" />
      </div>
    </div>
  );
};

const KanbanColumn = ({ status, tasks, onSelect }) => {
  const { setNodeRef } = useSortable({ id: status });
  return (
    <div ref={setNodeRef} className="bg-gray-100 rounded-xl p-4 w-80 flex-shrink-0">
      <h3 className="font-medium text-lg mb-4 px-2 text-gray-700 flex items-center justify-between">
        {status}
        <span className="text-sm font-normal text-orange-500 bg-gray-200 rounded-full px-2 py-0.5">{tasks.length}</span>
      </h3>
      <SortableContext items={tasks.map(t => t.id)}>
        <div className="space-y-3 min-h-[200px]">
          {tasks.map(task => <KanbanCard key={task.id} task={task} onSelect={onSelect} />)}
        </div>
      </SortableContext>
    </div>
  );
};

const TaskDetail = ({ task, onClose, onUpdateTask }) => {
  const [newComment, setNewComment] = useState('');
  const [timer, setTimer] = useState(null);
  const [time, setTime] = useState(task.timeTracked || 0);

  useEffect(() => {
    setTime(task.timeTracked || 0);

    if (task.isTracking) {
      const timerId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setTimer(timerId);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [task]);

    const handleTimeToggle = () => {
    const now = Date.now();
    if (task.isTracking) {
      clearInterval(timer);
      const elapsed = Math.floor((now - (task.lastStartTime || now)) / 1000);
      onUpdateTask({ ...task, isTracking: false, timeTracked: (task.timeTracked || 0) + elapsed, lastStartTime: null });
    } else {
      onUpdateTask({ ...task, isTracking: true, lastStartTime: now });
    }
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentToAdd = {
      id: `com-${Date.now()}`,
      text: newComment,
      author: { name: 'Me' }, 
      timestamp: 'Just now',
    };

    const updatedTask = {
      ...task,
      comments: [...task.comments, commentToAdd],
    };
    onUpdateTask(updatedTask);
    setNewComment('');
  };
  if (!task) return null;
  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-40 grid" style={{ gridTemplateRows: 'auto 1fr' }}>
      <div className="p-8 flex flex-col h-full">
        <div className="flex-shrink-0">
            <button onClick={onClose} className="absolute top-6 right-6 text-orange-500 hover:text-gray-800 text-3xl">&times;</button>
            <h2 className="text-3xl font-medium mb-2">{task.text}</h2>
            <div className="flex items-center gap-4 text-sm text-orange-500 mb-6">
                <span className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium ${priorityColors[task.priority]}`}><FiFlag size={12} /> {task.priority}</span>
                <span className="flex items-center gap-1.5"><FiCalendar /> {task.dueDate}</span>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Assigned To</h3>
                <div className="flex items-center gap-3">
                    <img src={task.assignedTo.avatar} alt={task.assignedTo.name} className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="font-medium text-gray-800">{task.assignedTo.name}</p>
                        <p className="text-sm text-orange-500">Developer</p>
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Status</h3>
                <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {task.completed ? 'Completed' : task.status}
                </p>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Time Tracking</h3>
                <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
                    <FiClock className="w-6 h-6 text-gray-600" />
                    <p className="text-2xl font-mono font-medium text-gray-800">{formatTime(time)}</p>
                    <button onClick={handleTimeToggle} className={`ml-auto px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 ${task.isTracking ? 'bg-red-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}>
                        {task.isTracking ? <><FiSquare className="w-4 h-4"/>Stop</> : <><FiPlay className="w-4 h-4"/>Start</>}
                    </button>
                </div>
            </div>
        </div>
        <div className="flex-grow border-t border-gray-200 pt-6 overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">Activity & Comments</h3>
            <div className="space-y-4 mb-6">
            {task.comments && task.comments.map(comment => (
                <div key={comment.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600 text-sm">{comment.author.name.charAt(0)}</div>
                <div>
                    <p className="text-sm text-gray-800 bg-gray-100 rounded-lg px-3 py-2 inline-block">{comment.text}</p>
                    <span className="text-xs text-gray-400 ml-2">{comment.timestamp}</span>
                </div>
                </div>
            ))}
            </div>
        </div>
        <div className="flex-shrink-0 pt-4">
            <form onSubmit={handleAddComment} className="flex items-center gap-3">
            <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..." 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" 
            />
            <button type="submit" className="px-4 py-2.5 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 disabled:bg-orange-300" disabled={!newComment.trim()}>Send</button>
            </form>
        </div>
      </div>
    </motion.div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState('list');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');
  const [calendarDate, setCalendarDate] = useState(new Date());

  const sortedTasks = useMemo(() => {
    const tasksCopy = [...tasks];
    if (sortOrder === 'priority') {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      tasksCopy.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortOrder === 'dueDate') {
      tasksCopy.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOrder === 'workload') {
      tasksCopy.sort((a, b) => (a.workload || 0) - (b.workload || 0));
    }
    return tasksCopy;
  }, [tasks, sortOrder]);

  const tasksByDate = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const date = format(new Date(task.dueDate), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    }, {});
  }, [tasks]);


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainer = active.data.current?.sortable?.containerId;
    const overContainer = over.data.current?.sortable?.containerId || over.id;

    if (!activeContainer || !overContainer) return;

    if (activeContainer !== overContainer) {
      setTasks((prev) => {
        const activeIndex = prev.findIndex((t) => t.id === activeId);
        let newTasks = [...prev];
        const [movedTask] = newTasks.splice(activeIndex, 1);
        movedTask.status = overContainer;

        const tasksInNewColumn = newTasks.filter(t => t.status === overContainer);
        const overTaskInNewColumn = over.data.current?.sortable ? tasksInNewColumn.find(t => t.id === overId) : null;

        if (overTaskInNewColumn) {
            const newColumnIndex = tasksInNewColumn.indexOf(overTaskInNewColumn);
            const overallIndex = newTasks.indexOf(tasksInNewColumn[newColumnIndex]);
            newTasks.splice(overallIndex, 0, movedTask);
        } else {
            const firstTaskOfColumnIndex = newTasks.findIndex(t => t.status === overContainer);
            if (firstTaskOfColumnIndex !== -1) {
                newTasks.splice(firstTaskOfColumnIndex, 0, movedTask);
            } else {
                newTasks.push(movedTask); 
            }
        }

        return newTasks;
      });
    } else {
      setTasks((prevTasks) => {
        const oldIndex = prevTasks.findIndex((t) => t.id === activeId);
        const newIndex = prevTasks.findIndex((t) => t.id === overId);
        if (oldIndex === -1 || newIndex === -1) return prevTasks; 
        return arrayMove(prevTasks, oldIndex, newIndex);
      });
    }
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    if (selectedTask && selectedTask.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
    } else {
      const newTask = { 
        ...taskData, 
        id: `task-${Date.now()}`,
        completed: false,
        assignedTo: { name: 'Unassigned', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' },
        status: 'Backlog',
        comments: [],
        subtasks: [],
        tags: []
      };
      setTasks([newTask, ...tasks]);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed, status: !task.completed ? 'Done' : 'To-Do' } : task
    ));
  };

    const handleAutoPrioritize = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    let prioritizedTasks = tasks.map(task => {
      const dueDate = new Date(task.dueDate);
      let priority = task.priority;

      const highPriorityKeywords = ['critical', 'urgent', 'bug', 'fix'];
      const hasHighPriorityKeyword = highPriorityKeywords.some(keyword => task.text.toLowerCase().includes(keyword));

      if (isSameDay(dueDate, today) || isSameDay(dueDate, tomorrow) || hasHighPriorityKeyword) {
        priority = 'High';
      } else if (dueDate < today) { 
        priority = 'High';
      } else if (dueDate.getTime() - today.getTime() > 7 * 24 * 60 * 60 * 1000) { 
        priority = 'Low';
      } else {
        priority = 'Medium';
      }

      return { ...task, priority };
    });

    for (let i = prioritizedTasks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [prioritizedTasks[i], prioritizedTasks[j]] = [prioritizedTasks[j], prioritizedTasks[i]];
    }

    setTasks(prioritizedTasks);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

    const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = format(date, 'yyyy-MM-dd');
      if (tasksByDate[dateStr]) {
        return 'deadline-date';
      }
    }
    return null;
  };

  const renderCalendarTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayTasks = tasksByDate[dateStr];
      if (dayTasks && dayTasks.length > 0) {
        return (
          <>
            <div className="task-dots-container">
              {dayTasks.slice(0, 4).map(task => (
                <div key={task.id} className={`task-dot ${priorityColors[task.priority].split(' ')[0].replace('bg-', 'bg-')}`}/>
              ))}
            </div>
            <div className="task-tooltip">
              {dayTasks.map(task => (
                <div key={task.id}>{task.text}</div>
              ))}
            </div>
          </>
        );
      }
    }
    return null;
  };



  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <motion.div layout className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <AnimatePresence>
              {sortedTasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={handleToggleComplete} onEdit={(task) => { setEditingTask(task); setIsFormOpen(true); }} onDelete={handleDeleteTask} onSelect={setSelectedTask} />
              ))}
            </AnimatePresence>
          </motion.div>
        );
      case 'board':
        return (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex gap-6 overflow-x-auto pb-4">
              <SortableContext items={columns}>
                {columns.map(status => (
                  <KanbanColumn key={status} status={status} tasks={tasks.filter(t => t.status === status)} onSelect={setSelectedTask} />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        );
      case 'calendar':
        return (
          <motion.div layout className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Calendar
              onChange={setCalendarDate}
              value={calendarDate}
              tileContent={renderCalendarTileContent}
              tileClassName={tileClassName}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-medium text-gray-800">Tasks</h1>
        <div className="flex items-center gap-4">
            <button onClick={handleAutoPrioritize} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 shadow-sm">
              <FiZap /> Auto-Prioritize
            </button>
            <div className="relative">
              <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} className="pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none">
                <option value="default">Sort by</option>
                <option value="priority">Priority</option>
                <option value="dueDate">Due Date</option>
                <option value="workload">Workload</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 pointer-events-none" />
            </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200">
            <button onClick={() => setView('list')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${view === 'list' ? 'bg-orange-600 text-white' : 'text-gray-600 hover:bg-orange-100'}`}><FiList className="inline mr-2"/>List</button>
            <button onClick={() => setView('board')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${view === 'board' ? 'bg-orange-600 text-white' : 'text-gray-600 hover:bg-orange-100'}`}><FiLayout className="inline mr-2"/>Board</button>
            <button onClick={() => setView('calendar')} className={`px-3 py-1.5 text-sm font-medium rounded-md ${view === 'calendar' ? 'bg-orange-600 text-white' : 'text-gray-600 hover:bg-orange-100'}`}><FiCalendar className="inline mr-2"/>Calendar</button>

          </div>
          <button onClick={() => { setEditingTask(null); setIsFormOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 shadow-sm">
            <FiPlus /> New Task
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                 <div className="bg-white rounded-xl p-8 w-full max-w-lg">
                    <h2 className="text-2xl font-medium mb-6">{editingTask ? 'Edit Task' : 'New Task'}</h2>
                    <TaskForm onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} task={editingTask} />
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {renderView()}

      <AnimatePresence>
        {selectedTask && <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} onUpdateTask={handleUpdateTask} />}
      </AnimatePresence>
    </main>
  );
};

export default Tasks;
