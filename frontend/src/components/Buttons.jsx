const PrimaryButton = ({ label, Icon }) => {
  return (
    <button className="flex justify-center items-center px-7 py-4 border shadow-md hover:shadow-lg text-md font-semibold leading-none bg-yellow-500 rounded-xl border-yellow-500 text-white">
      {label}
      {Icon && <Icon className="w-5 h-5 ml-2" />}
    </button>
  );
};

const SecondaryButton = ({ label, Icon }) => {
  return (
    <button className="flex justify-center items-center px-7 py-4 border shadow-md hover:shadow-lg text-md leading-none rounded-xl border-yellow-500">
      {label}
      {Icon && <Icon className="w-5 h-5 ml-2" />}
    </button>
  );
};

export { PrimaryButton, SecondaryButton };
