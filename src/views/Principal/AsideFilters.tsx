
export default function AsideFilters() {
    return (
        <aside className="hidden md:block md:w-[20%] mt-5">
            <p>Filters</p>

            <div className="flex flex-col gap-2 mt-5 pl-3 text-gray-500">
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Full Time
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Part Time
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Freelance
                </label>
            </div>

            <p className="mt-5">Salary</p>
            <div className="flex flex-col gap-2 mt-5 pl-3 text-gray-500">
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    $0 - $500
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    $500 - $1000
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    $1000 - $2000
                </label>
            </div>

            <p className="mt-5">City</p>
             <div className="flex flex-col gap-2 mt-5 pl-3 text-gray-500">
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Chihuahua
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    CD. Juárez
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Nvo. Casas Grandes
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Casas Grandes
                </label>
            </div>
        </aside>
    )
}
