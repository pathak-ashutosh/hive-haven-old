const SecondarySubmitButton = ({ label, Icon }) => {
  return (
    <button
      type="submit"
      className="flex justify-center items-center px-7 py-4 border shadow-md hover:shadow-lg text-md leading-none rounded-3xl border-yellow-500"
    >
      {label}
      {Icon && <Icon className="inline-block ml-2" />}
    </button>
  );
};

export default SecondarySubmitButton;