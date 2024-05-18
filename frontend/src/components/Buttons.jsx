const PrimaryButton = ({label, Icon}) => {
  return (
    <button className="flex justify-center items-center px-7 py-4 border text-lg leading-none bg-yellow rounded-lg border-yellow">
      {label}
      {Icon && <Icon className="w-5 h-5 ml-2" />}
    </button>
  )
}

const SecondaryButton = ({label, Icon}) => {
  return (
    <button className="flex justify-center items-center px-7 py-4 border text-lg leading-none rounded-lg border-yellow">
      {label}
      {Icon && <Icon className="w-5 h-5 ml-2" />}
    </button>
  )
}

export { PrimaryButton, SecondaryButton }