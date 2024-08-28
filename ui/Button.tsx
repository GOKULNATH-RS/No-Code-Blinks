const Button = ({ label, className, border, bg, dashed }: any) => {
  console.log('Button rendered : ', dashed)
  return (
    <div
      className={`gradient_700_800 h-max w-max m-2 rounded-xl ${
        border ? 'p-[1px]' : ''
      }`}
    >
      <button
        className={`${className} flex-center h-12 w-52 ${
          bg ? bg : 'gradient_600_700 bg-opacity-70'
        } rounded-xl ${
          dashed ? 'border-jaguar-700 border-dashed border-[1px]' : ''
        }`}
      >
        {label}
      </button>
    </div>
  )
}

export default Button
