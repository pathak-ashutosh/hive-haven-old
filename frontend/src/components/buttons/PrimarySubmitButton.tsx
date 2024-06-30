import { FC, ComponentType } from "react";

interface PrimarySubmitButtonProps {
  label: string;
  Icon?: ComponentType<{ className?: string }> | null;
}

const PrimarySubmitButton: FC<PrimarySubmitButtonProps> = ({ label, Icon }) => {
  return (
    <button
      type="submit"
      className="flex justify-center items-center px-7 py-4 border shadow-md hover:shadow-lg text-md font-semibold leading-none bg-yellow-500 rounded-3xl border-yellow-500 text-white"
    >
      {label}
      {Icon && <Icon className="inline-block ml-2" />}
    </button>
  );
};

export default PrimarySubmitButton;