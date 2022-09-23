import React from 'react'

interface InputGroupProps {
    className?: string
    type: string
    placeholder: string
    value: string
    error: string | undefined
    setValue: (str: string) => void
}

const InputGroup: React.FC<InputGroupProps> = ({
    error, placeholder, setValue, type, value, className
}) => {
    return (
        <div className={className}>
            <input
                type={type}
                className="w-full px-3 py-2 bg-gray-200 border border-gray-400 rounded"
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <small className='font-medium text-red-600'>{error}</small>
        </div>
    )
}

export default InputGroup