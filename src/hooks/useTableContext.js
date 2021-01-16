import { useContext } from 'react';
import { TableContext } from '../App';

const useTableContext = () => {
    const methods = useContext(TableContext);
    if (!methods)
        throw Error(
            "You must use 'useTableContext' inside 'TableContext' provider",
        );

    return methods;
};

export default useTableContext;
