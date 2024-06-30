import { FC, ComponentType } from "react";

interface PrimaryButtonProps {
  label: string;
  Icon?: ComponentType<{ className?: string }> | null;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ label, Icon }) => {
  return (
    <button className="flex justify-center items-center px-7 py-4 border shadow-md hover:shadow-lg text-md font-semibold leading-none bg-yellow-500 rounded-3xl border-yellow-500 text-white">
      {label}
      {Icon && <Icon className="inline-block ml-2" />}
    </button>
  );
};

export default PrimaryButton;