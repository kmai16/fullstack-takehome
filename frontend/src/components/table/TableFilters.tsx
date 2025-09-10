type TableFiltersProps = {
    searchValue: string
    setSearchValue: (value: string) => void
}

export const TableFilters = ({ searchValue, setSearchValue }: TableFiltersProps) => {
    return (
        <div>
            <input type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
    )
}