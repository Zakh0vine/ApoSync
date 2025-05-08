export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-md max-w-2xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Konten Modal */}
        {children}
      </div>
    </div>
  );
}
