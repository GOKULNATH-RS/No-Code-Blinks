import Image from 'next/image'
import removeIcon from '../assets/icons/del-icon.svg'

export const Input = ({
  label,
  placeholder,
  type,
  className,
  deleteBtn
}: any) => {
  return (
    <div className={`flex flex-col gap-1 ${className || ''} `}>
      <label htmlFor={label} className='text-lg px-2'>
        {label}
      </label>
      <div className='flex gap-3 items-center'>
        <div className='p-[1px] rounded-[15px] gradient_700_800 w-max'>
          <input
            type={type}
            placeholder={placeholder}
            className='px-2 h-12 w-[350px] rounded-[14px] bg-jaguar-950'
          />
        </div>
        <div className=''>
          {deleteBtn && (
            <div className='rounded-xl p-2 border-[#8F0000] border-[1px]'>
              <Image src={removeIcon} alt='remove' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
