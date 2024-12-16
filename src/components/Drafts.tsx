import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { Post } from '../types';
import PostActionsMenu from './post/PostActionsMenu';

interface DraftsProps {
  drafts: Post[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const Drafts: React.FC<DraftsProps> = ({ drafts, onDelete, onEdit }) => {
  if (drafts.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow mt-8">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Drafts</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {drafts.map((draft) => (
          <div key={draft.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">{draft.title || 'Untitled Draft'}</p>
                <p className="text-xs text-gray-500">Last edited {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="rounded-lg p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => onEdit(draft.id)}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button 
                  className="rounded-lg p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => onDelete(draft.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <PostActionsMenu />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drafts;