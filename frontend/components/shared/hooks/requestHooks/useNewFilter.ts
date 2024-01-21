import {useState} from "react";

export const useNewFilter = <T extends object> (filtersObject: T ) => {
    const [filters, setFilters ] = useState<T>(filtersObject)
    const [isFiltersActive, setIsFilterActive] = useState<boolean>(false)

    function checkIsFilterActive(){
        setIsFilterActive(Boolean( Object.values(filters).some(value => value !== null)))
    }

    return [filters, setFilters, isFiltersActive, checkIsFilterActive] as const;
}