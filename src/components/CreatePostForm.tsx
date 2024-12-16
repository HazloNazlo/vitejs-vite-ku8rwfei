import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { SocialPlatformButtons } from './SocialPlatformButtons';
import MediaUpload from './MediaUpload';
import ScheduleInputs from './form/ScheduleInputs';
import FormButtons from './form/FormButtons';
import type { SocialPlatform } from '../types';
import clsx from 'clsx';

interface CreatePostFormProps {
  onSubmit?: (postData: any) => void;
  onSaveDraft?: (postData: any) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, onSaveDraft }) => {
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleMediaSelect = (files: FileList) => {
    setSelectedMedia(Array.from(files));
  };

  const validateForm = () => {
    if (!content.trim()) {
      setError('Please enter post content');
      return false;
    }
    if (selectedPlatforms.length === 0) {
      setError('Please select at least one platform');
      return false;
    }
    if (!date || !time) {
      setError('Please select date and time');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const postData = {
      content,
      scheduledFor: `${date}T${time}`,
      platforms: selectedPlatforms,
      media: selectedMedia,
      id: Date.now().toString(),
    };

    onSubmit?.(postData);
  };

  const handleSaveDraft = () => {
    if (!content.trim() && selectedMedia.length === 0) {
      setError('Please add content or media to save as draft');
      return;
    }

    const draftData = {
      content,
      platforms: selectedPlatforms,
      media: selectedMedia,
      id: Date.now().toString(),
      lastEdited: new Date().toISOString(),
    };

    onSaveDraft?.(draftData);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <MediaUpload
            onMediaSelect={handleMediaSelect}
            selectedMedia={selectedMedia}
          />
          <button
            type="button"
            className="rounded-lg inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faLink} className="mr-2" />
            Link
          </button>
        </div>
      </div>

      <textarea
        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-custom focus:border-custom resize-none"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <ScheduleInputs
        date={date}
        time={time}
        onDateChange={setDate}
        onTimeChange={setTime}
      />

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Post to</h3>
        <SocialPlatformButtons 
          onChange={setSelectedPlatforms}
          selectedPlatforms={selectedPlatforms}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <FormButtons
        onSaveDraft={handleSaveDraft}
        isSubmitDisabled={!content.trim() || selectedPlatforms.length === 0 || !date || !time}
      />
    </form>
  );
};

export default CreatePostForm;