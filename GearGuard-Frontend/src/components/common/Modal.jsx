export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-[0] bg-[#00000080] flex items-center justify-center z-[50]">
      <div className="bg-[#ffffff] w-[28rem] p-[1.5rem] rounded-[0.75rem] shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
        {children}
        <button
          onClick={onClose}
          className="mt-[1.25rem] w-full h-[2.75rem] bg-[#e5e7eb] rounded-[0.375rem]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
