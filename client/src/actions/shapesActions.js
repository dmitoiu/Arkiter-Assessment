// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// RGU eShop (voucherActions.js) v1.0.0 13/03/2021
// A web application designed for a ecommerce shop
// -----------------------------------------------------------------------

// Importing components
import {
    SHAPES_DATA_FAIL,
    SHAPES_DATA_REQUEST,
    SHAPES_DATA_SUCCESS,
    SHAPES_FAIL,
    SHAPES_UPDATE_REQUEST,
    SHAPES_UPDATE_SUCCESS,
    SHAPES_UPDATE_FAIL,
    SHAPES_REQUEST,
    SHAPES_DELETE_FAIL,
    SHAPES_DELETE_REQUEST,
    SHAPES_DELETE_SUCCESS,
    SHAPES_SUCCESS,
    SHAPES_DATA_CONTENT_REQUEST,
    SHAPES_DATA_CONTENT_SUCCESS,
    SHAPES_DATA_CONTENT_FAIL,
    SHAPES_ADD_SUCCESS,
    SHAPES_ADD_FAIL, SHAPES_ADD_REQUEST
} from "../constants/shapesConstants";
import auth from "../helpers/authHelper";

const addShapes = (rectangles, circles, stars) => async (dispatch) => {
    try{
        // Dispatch project request
        dispatch({
            type: SHAPES_ADD_REQUEST
        })

        // Create request method
        const method = "POST";

        // Create request headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.isAuthenticated().token}`,
        }

        // Create request body
        const data = {
            rectangles: rectangles,
            circles: circles,
            stars: stars
        }

        console.log("Data: ", data);

        // Create complete request
        let response = await fetch("/api/posts/add", {
            method: method,
            headers: headers,
            body:JSON.stringify(data)
        });

        // Get result as json
        let result = await response.json();

        // IF there is no error, dispatch success
        if(result.error == null){
            dispatch({
                type: SHAPES_ADD_SUCCESS,
                payload: result
            })
        } else {
            dispatch({
                type: SHAPES_ADD_FAIL,
                payload: result.error
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const updateShapes = (rectangles, circles, stars) => async (dispatch) => {
    try{
        // Dispatch project request
        dispatch({
            type: SHAPES_UPDATE_REQUEST
        })

        // Create request method
        const method = "POST";

        // Create request headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        // Create request body
        const data = {
            groupName: "Shapes Group",
            rects: rectangles,
            circles: circles,
            stars: stars,
            color: "white"

        }

        // Create complete request
        let response = await fetch("/api/shapes/update", {
            method: method,
            headers: headers,
            body:JSON.stringify(data)
        });

        // Get result as json
        let result = await response.json();

        // IF there is no error, dispatch success
        if(result.error == null){
            dispatch({
                type: SHAPES_UPDATE_SUCCESS,
                payload: result
            })
        } else {
            dispatch({
                type: SHAPES_UPDATE_FAIL,
                payload: result.error
            })
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get all vouchers and their interest count
 * @returns {function(...[*]=)}
 */
const getShapes = () => async (dispatch) => {
    try{
        // Get voucher data request
        dispatch({
            type: SHAPES_DATA_REQUEST
        })

        // Crete request method
        const method = "GET";

        // Create request headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        // Create complete request
        let response = await fetch("/api/shapes", {
            method: method,
            headers: headers,
        });

        // Get result as json
        let result = await response.json();

        console.log("Result: ", result);

        // If there is no error, dispatch success
        if(result.error == null){
            dispatch({
                type: SHAPES_DATA_SUCCESS,
                payload: result
            })

        } else {
            dispatch({
                type: SHAPES_DATA_FAIL,
                payload: result.error
            })
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get all vouchers and their interest count
 * @returns {function(...[*]=)}
 */
const getPostContent = (id) => async (dispatch) => {
    try{
        // Get project data request
        dispatch({
            type: SHAPES_DATA_CONTENT_REQUEST
        })

        // Crete request method
        const method = "GET";

        // Create request headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        // Create complete request
        let response = await fetch(`/api/posts/${id}`, {
            method: method,
            headers: headers,
        });

        // Get result as json
        let result = await response.json();

        // If there is no error, dispatch success
        if(result.error == null){
            dispatch({
                type: SHAPES_DATA_CONTENT_SUCCESS,
                payload: result
            })

        } else {
            dispatch({
                type: SHAPES_DATA_CONTENT_FAIL,
                payload: result.error
            })
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Delete project using the name of the project
 * @param projectName
 * @returns {function(...[*]=)}
 */
const deletePost = (postName) => async (dispatch) => {
    try{
        // Dispatch voucher request
        dispatch({
            type: SHAPES_DELETE_REQUEST
        })

        // Create request method
        const method = "POST";

        // Create request headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.isAuthenticated().token}`,
        }

        // Create request body
        const data = {
            name: postName,
        }

        // Create complete request
        let response = await fetch("/api/posts/delete", {
            method: method,
            headers: headers,
            body:JSON.stringify(data)
        });

        // Get result as json
        let result = await response.json();

        // IF there is no error, dispatch success
        if(result.error == null){
            dispatch({
                type: SHAPES_DELETE_SUCCESS,
                payload: result
            })
        } else {
            dispatch({
                type: SHAPES_DELETE_FAIL,
                payload: result.error
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export {addShapes, updateShapes, deletePost, getShapes, getPostContent};