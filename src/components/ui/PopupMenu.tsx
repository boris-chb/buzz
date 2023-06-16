import { useEffect, useRef, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

interface PopupMenuProps {
  onEdit: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ onEdit }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleTogglePopup = () => {
    setIsPopupVisible((prevIsPopupVisible) => !prevIsPopupVisible);
  };

  const handleDelete = () => {
    // Handle delete logic
  };

  return (
    <div ref={popupRef} className="relative ml-auto flex items-center">
      <button
        title="Settings"
        className="ml-auto text-slate-500 hover:text-slate-700 focus:outline-none"
        onClick={handleTogglePopup}
      >
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </button>

      {isPopupVisible && (
        <div className="absolute right-0 top-0 w-48 rounded-lg border border-gray-300 bg-white shadow-lg">
          <button
            className="block w-full rounded-t-lg px-4 py-2 text-left text-gray-800 hover:bg-gray-200 focus:outline-none"
            onClick={() => {
              onEdit();
              setIsPopupVisible(false);
            }}
          >
            Edit
          </button>
          <button
            className="block w-full rounded-b-lg px-4 py-2 text-left text-red-600 hover:bg-red-100 focus:outline-none"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
