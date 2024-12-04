"use client"

export function Select({label, option, onChange, value}: 
    {
    label:string, option:string[], 
    onChange:(e:React.ChangeEvent<HTMLSelectElement>) => void,
    value: string | undefined
}) {
    return (
        <div className="w-full">
            <div className="p-2 font-semibold text-lg">
            <label>
                {label}
            </label>

            </div>
            
            <select value={value} onChange={onChange} className="w-full p-2.5 focus:outline-none border border-purple-500 rounded-md">
                <option>Select the Bank:</option>
                {option.map((o, index) =>(
                    <option key={index}>{o}</option>
                ))}
            </select>
        </div>
    )
}