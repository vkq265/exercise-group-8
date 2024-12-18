import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";


export const CATEGORY_ACTION_TYPES = {
    GET_CATEGORIES: "GET_CATEGORIES",
    ADD_CATEGORY: "ADD_CATEGORY",
    UPDATE_CATEGORY: "UPDATE_CATEGORY",
    DELETE_CATEGORY: "DELETE_CATEGORY"
}

export const getCategories = () => async (dispatch) => {
    try {
        const res = await getDataAPI("category")
        if (res.status !== 200) {
            dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: res.data.message })
            return;
        }
        dispatch({
            type: CATEGORY_ACTION_TYPES.GET_CATEGORIES,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
    }
}