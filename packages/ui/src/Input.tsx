"use client";

export function Input({onChange, label, placeholder, value}: 
    {onChange:(event: React.ChangeEvent<HTMLInputElement>) => void,
    label:string, 
    placeholder:string,
    value: any}) {
    return (
        <div className="flex flex-col">
            <label className="font-semibold text-lg text p-2">
                {label}
            </label>
            <div className="p-2 w-full">
            <input onChange={onChange} value={value} className="w-full p-2 border border-purple-500 focus:outline-none rounded-md" type="text" placeholder={placeholder}></input>

            </div>
            
        </div>
    )
}