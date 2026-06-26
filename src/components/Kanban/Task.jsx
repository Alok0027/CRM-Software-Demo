import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiPaperclip, FiMessageSquare, FiClock, FiMoreHorizontal, FiEdit2, FiTrash2, FiCheckSquare, FiShare2, FiMail } from 'react-icons/fi';
import { FaWhatsapp, FaMicrosoft } from 'react-icons/fa';

const Task = ({ task, onEdit, onDelete }) => {
  const { useState } = React;
      const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareVisible, setShareVisible] = useState(false);

  const checklist = task.checklist || [];
  const completedCount = checklist.filter(item => item.completed).length;
  const totalCount = checklist.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleShare = (platform) => {
    const checklistText = (task.checklist || [])
      .map(item => `  - [${item.completed ? 'x' : ' '}] ${item.text}`)
      .join('\n');

    const shareText = `*Task: ${task.title}*\n\n*Due:* ${task.dueDate || 'Not set'}\n*Priority:* ${task.priority}\n\n*Checklist:*\n${checklistText || 'No sub-tasks'}`;

    const subject = `Task: ${task.title}`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(shareText)}`;
        break;
      case 'teams':
        navigator.clipboard.writeText(shareText).then(() => {
          alert('Task details copied to clipboard!');
        });
        break;
      default:
        break;
    }
  };
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'Task', task },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : 1,
    boxShadow: isDragging ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' : 'none',
    zIndex: isDragging ? 10 : 'auto',
  };

  const priorityColors = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200/80 relative cursor-grab active:cursor-grabbing">
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg ${priorityColors[task.priority]}`}></div>
      
      {/* Title */}
      <div className="flex justify-between items-start">
        <h4 className="font-normal text-sm sm:text-base text-gray-800 mb-2 pl-2 flex-1">{task.title}</h4>
        <div className="relative">
          <button onClick={() => setIsMenuOpen(prev => !prev)} className="p-1 rounded-full hover:bg-gray-100">
            <FiMoreHorizontal />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200/80">
              <button onClick={() => { onEdit(task); setIsMenuOpen(false); }} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FiEdit2 size={14} />
                <span>Edit Task</span>
              </button>
              <button onClick={() => { onDelete(task.id); setIsMenuOpen(false); }} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <FiTrash2 size={14} />
                <span>Delete Task</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
            {/* Checklist Progress */}
      {totalCount > 0 && (
        <div className="mt-4 pl-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-normal text-gray-600">Progress</span>
            <span className="text-xs font-normal text-gray-600">{completedCount} / {totalCount}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4 pl-2 mt-4">
        {task.tags.map(tag => (
          <span key={tag} className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200/80 pt-3 mt-3">
        <div className="flex flex-wrap justify-between items-center gap-y-2">
          <div className="flex items-center flex-wrap gap-x-3 sm:gap-x-4 gap-y-2 text-gray-500">
            <span className="flex items-center gap-1.5 text-xs"><FiPaperclip /> {task.attachments}</span>
            <span className="flex items-center gap-1.5 text-xs"><FiMessageSquare /> {task.comments.length}</span>
            {totalCount > 0 && (
              <span className="flex items-center gap-1.5 text-xs"><FiCheckSquare /> {completedCount}/{totalCount}</span>
            )}
            <span className="flex items-center gap-1.5 text-xs font-medium bg-gray-100 p-1 rounded"><FiClock size={14} /> {task.dueDate}</span>
            <button onClick={() => setShareVisible(prev => !prev)} className="text-gray-500 hover:text-orange-500 transition-colors ml-2">
              <FiShare2 size={16} />
            </button>
          </div>
          <div className="flex -space-x-2">
            {task.assignees.map(assignee => (
              <img key={assignee.id} src={assignee.avatar} alt="Assignee" className="w-7 h-7 rounded-full border-2 border-white" />
            ))}
          </div>
        </div>
        {isShareVisible && (
          <div className="flex justify-center items-center gap-4 mt-3 p-2 bg-gray-100 rounded-md">
            <button onClick={() => handleShare('whatsapp')} className="text-gray-500 hover:text-green-500 transition-colors"><FaWhatsapp size={20} /></button>
            <button onClick={() => handleShare('email')} className="text-gray-500 hover:text-red-500 transition-colors"><FiMail size={20} /></button>
            <button onClick={() => handleShare('teams')} className="text-gray-500 hover:text-blue-600 transition-colors"><FaMicrosoft size={20} /></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
