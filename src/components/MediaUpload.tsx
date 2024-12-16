import React, { useRef } from 'react';
import { Image } from 'lucide-react';
import clsx from 'clsx';
import MediaPreview from './MediaPreview';

interface MediaUploadProps {
  onMediaSelect: (files: FileList) => void;
  selectedMedia: File[];
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onMediaSelect, selectedMedia }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onMediaSelect(event.target.files);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        multiple
        accept="image/*,video/*"
      />
      <button
        type="button"
        onClick={handleClick}
        className="rounded-lg inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Image className="w-4 h-4 mr-2" />
        Media
      </button>

      {selectedMedia.length > 0 && <MediaPreview media={selectedMedia} />}
    </div>
  );
};

export default MediaUpload;