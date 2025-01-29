// components/Popup.tsx
import React from 'react';

interface PopupProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const Popup: React.FC<PopupProps> = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-1/3 text-center">
        <h3 className="text-lg font-semibold mb-4">Apakah Anda yakin ingin menghapus mobil ini?</h3>
        <div className="flex justify-around">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-2xl"
            onClick={onConfirm}
          >
            Ya, Hapus
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-2xl"
            onClick={onCancel}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
