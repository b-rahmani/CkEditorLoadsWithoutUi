import { useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ListContext } from 'Contexts'
import { useLocalStorageState } from 'Hooks'
// import Cards from './EntitiesCards'
import Table from './EntitiesTable'
import Tree from './EntitiesTree';

const Entities = () => {

    const {
        card,
        isBrowse,
        isTree,
        loading,
    } = useContext(ListContext);

    return <div
        id='items'
        className={
            ' transition-colors md:rounded-lg flex flex-col items-center justify-center '
            + (!isBrowse && ' py-6 ')
            + (card && " flex-col")
        }
        style={{
            maxWidth: '100vw'
        }}
    >
        {
            loading
                ?
                <CircularProgress
                    className="my-12"
                />
                :
                (
                    isTree
                        ?
                        <Tree />
                        :
                        card
                            ?
                            // <Cards />
                            <div>cards</div>
                            :
                            <Table />
                )
        }
    </div>
}

export default Entities;
