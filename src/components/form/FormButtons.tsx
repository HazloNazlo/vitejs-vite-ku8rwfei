import React from 'react';
import clsx from 'clsx';

interface FormButtonsProps {
  onSaveDraft: () => void;
  isSubmitDisabled: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ onSaveDraft, isSubmitDisabled }) => {
  return (
    <div className="mt-8 flex justify-end space-x-3">
      <button
        type="button"
        onClick={onSaveDraft}
        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
      >
        Save as draft
      </button>
      <button
        type="submit"
        className={clsx(
          "rounded-lg px-4 py-2 text-sm font-medium text-white",
          "bg-custom hover:bg-custom/90",
          isSubmitDisabled && "opacity-50 cursor-not-allowed"
        )}
        disabled={isSubmitDisabled}
      >
        Schedule post
      </button>
    </div>
  );
};

export default FormButtons;