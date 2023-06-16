import React, { useEffect, useRef, useState } from "react";

interface EditTweetProps {
  initialTweetText: string;
  onCancel: () => void;
}

const EditTweet: React.FC<EditTweetProps> = ({
  initialTweetText,
  onCancel,
}) => {
  const [tweetText, setTweetText] = useState(initialTweetText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(tweetText.length, tweetText.length);
    }
  }, []);

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(e.target.value);
  };

  const handleTweetSave = (e: React.FormEvent) => {
    e.preventDefault();
    // onSave(tweetText);
  };

  return (
    <div className="mt-2 rounded-lg bg-white p-4">
      <textarea
        ref={textareaRef}
        className="w-full resize-none bg-transparent text-slate-700 outline-none"
        rows={1}
        maxLength={100}
        value={tweetText}
        placeholder="What's happening?"
        onChange={(e) => setTweetText(e.target.value)}
      />
      <div className="mt-4 flex items-center justify-end">
        <button
          className="rounded-full bg-transparent text-slate-500 hover:text-slate-700 focus:outline-none"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="ml-4 rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
          onClick={handleTweetSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTweet;
