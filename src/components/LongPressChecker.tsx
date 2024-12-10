import { motion } from "framer-motion";

type LongPressCheckWrapperProps = {
  handleLongPress: () => void;
  onCheckedChange: (checked: boolean) => void;
  isSelectionMode: boolean;
  checked: boolean;
  children: React.ReactNode;
};

const LongPressCheckWrapper = ({
  handleLongPress,
  onCheckedChange,
  isSelectionMode,
  checked,
  children,
}: LongPressCheckWrapperProps) => {
  const handleCheckedChange = () => {
    if (isSelectionMode) {
      onCheckedChange(!checked);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="relative w-full cursor-pointer"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onTouchStart={() => {
        const timer = setTimeout(() => handleLongPress(), 500);
        return () => clearTimeout(timer);
      }}
      onClick={handleCheckedChange}
    >
      {children}
      {isSelectionMode && (
        <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: checked ? 1 : 0 }}
            className="w-4 h-4 bg-blue-500 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default LongPressCheckWrapper;
