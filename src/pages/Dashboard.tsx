import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import ScheduledPosts from '../components/ScheduledPosts';
import Drafts from '../components/Drafts';
import Analytics from '../components/Analytics';
import ConnectedAccounts from '../components/ConnectedAccounts';
import type { Post } from '../types';

const Dashboard: React.FC = () => {
  const [drafts, setDrafts] = useState<Post[]>([]);

  const handleSaveDraft = (draftData: Post) => {
    setDrafts([...drafts, draftData]);
  };

  const handleDeleteDraft = (id: string) => {
    setDrafts(drafts.filter(draft => draft.id !== id));
  };

  const handleEditDraft = (id: string) => {
    // Implement edit functionality
  };

  return (
    <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <CreatePost onSaveDraft={handleSaveDraft} />
          <ScheduledPosts />
          <Drafts 
            drafts={drafts}
            onDelete={handleDeleteDraft}
            onEdit={handleEditDraft}
          />
        </div>
        <div className="space-y-8">
          <Analytics />
          <ConnectedAccounts />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;