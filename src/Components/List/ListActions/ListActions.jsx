import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {
    ListContext,
    PanelContext
} from 'Contexts'
import AddAction from './AddAction';
import app from 'App';
import PopulateAction from './PopulateAction';

const ListActions = () => {
    let navigate = useNavigate();

    const { listActions, selectedEntities, entityType } = useContext(ListContext);

    const { fakeDataGenerators } = useContext(PanelContext)

    let clonedListActions = null;
    let actionItems = null;

    if (typeof listActions === 'function') {
        var actionsReturn = listActions(selectedEntities);
        if (actionsReturn.props.children) {
            actionItems = actionsReturn.props.children;
        }
        else {
            actionItems = actionsReturn;
        }
    }
    else {
        if (listActions) {
            if (listActions.props.children) {
                actionItems = listActions.props.children;
            }
            else {
                actionItems = listActions;
            }
        }
    }

    if (actionItems) {
        clonedListActions =
            React
                .Children
                .toArray(actionItems)
                .map(listAction => React.cloneElement(listAction, {

                }))
    }

    return <div
        id='listActions'
        className=
        {
            'flex flex-wrap items-center lg:mb-0 '
        }
    >
        <AddAction />
        {app.isDev() && fakeDataGenerators.includes(entityType) && <PopulateAction />}
        <div>
            {
                clonedListActions?.map((action, index) => {
                    if (action.props.minCardinality) {
                        if (selectedEntities.length >= action.props.minCardinality) {
                            return <span key={index}>
                                {
                                    app.t(action)
                                }
                            </span>
                        }
                        return <span key={index}>
                            {
                                app.t(action)
                            }
                        </span>
                    }
                    else {
                        return <span key={index}>
                            {
                                app.t(action)
                            }
                        </span>
                    }
                })
            }
        </div>
    </div>
}

export default ListActions;
