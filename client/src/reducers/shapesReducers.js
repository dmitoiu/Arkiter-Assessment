// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// Portfolio (postReducers.js) v1.0.0 13/03/2021
// A web application designed for a personal website
// -----------------------------------------------------------------------

// Importing constants
import {
    SHAPES_DATA_FAIL,
    SHAPES_DATA_REQUEST,
    SHAPES_DATA_SUCCESS,
    SHAPES_FAIL,
    SHAPES_REQUEST,
    SHAPES_DELETE_FAIL,
    SHAPES_DELETE_REQUEST,
    SHAPES_DELETE_SUCCESS,
    SHAPES_SUCCESS,
    SHAPES_DATA_CONTENT_REQUEST,
    SHAPES_DATA_CONTENT_SUCCESS,
    SHAPES_DATA_CONTENT_FAIL,
    SHAPES_UPDATE_SUCCESS, SHAPES_UPDATE_REQUEST, SHAPES_UPDATE_FAIL
} from "../constants/shapesConstants";

/**
 * Project Reducer
 * @param state
 * @param action
 * @returns {{loading: boolean}|{}|{loading: boolean, error: *}|{userInfo: *, loading: boolean}}
 */
const shapesReducer = (state = {}, action) => {
    if(action.type.match(SHAPES_REQUEST)) {
        return {loading: true};
    } else if(action.type.match(SHAPES_SUCCESS)) {
        return {loading: false, userInfo: action.payload}
    } else if(action.type.match(SHAPES_FAIL)) {
        return {loading: false, error: action.payload}
    } else {
        return state;
    }
}

/**
 * Voucher Retrieve Interest Data Reducer
 * @param state
 * @param action
 * @returns {{loading: boolean}|{vouchers: []}|{vouchersInfo: *, loading: boolean}|{loading: boolean, error: *}}
 */
const shapesDataReducer = (state = {shapes: []}, action) => {
    if(action.type.match(SHAPES_DATA_REQUEST)) {
        return {loading: true};
    } else if(action.type.match(SHAPES_DATA_SUCCESS)) {
        return {loading: false, shapesInfo: action.payload}
    } else if(action.type.match(SHAPES_DATA_FAIL)) {
        return {loading: false, error: action.payload}
    } else {
        return state;
    }
}

/**
 * Project Retrieve Data Content Reducer
 * @param state
 * @param action
 * @returns {{loading: boolean}|{projects: []}|{projectInfo: *, loading: boolean}|{loading: boolean, error: *}}
 */
const shapesContentReducer = (state = {project: {}}, action) => {
    if(action.type.match(SHAPES_DATA_CONTENT_REQUEST)) {
        return {loading: true};
    } else if(action.type.match(SHAPES_DATA_CONTENT_SUCCESS)) {
        return {loading: false, postsContent: action.payload}
    } else if(action.type.match(SHAPES_DATA_CONTENT_FAIL)) {
        return {loading: false, error: action.payload}
    } else {
        return state;
    }
}

/**
 * Update Project
 * @param state
 * @param action
 * @returns {{loading: boolean}|{projects: []}|{vouchersInfo: *, loading: boolean}|{loading: boolean, error: *}}
 */
const shapesUpdateReducer = (state = {project: {}}, action) => {
    if(action.type.match(SHAPES_UPDATE_REQUEST)) {
        return {loading: true};
    } else if(action.type.match(SHAPES_UPDATE_SUCCESS)) {
        return {loading: false, postsInfo: action.payload}
    } else if(action.type.match(SHAPES_UPDATE_FAIL)) {
        return {loading: false, error: action.payload}
    } else {
        return state;
    }
}

/**
 * Voucher Interest Count Reset Reducer
 * @param state
 * @param action
 * @returns {{loading: boolean}|{}|{vouchersInfo: *, loading: boolean}|{loading: boolean, error: *}}
 */
const shapesDeleteReducer = (state = {}, action) => {
    if(action.type.match(SHAPES_DELETE_REQUEST)) {
        return {loading: true};
    } else if(action.type.match(SHAPES_DELETE_SUCCESS)) {
        return {loading: false, postsInfo: action.payload}
    } else if(action.type.match(SHAPES_DELETE_FAIL)) {
        return {loading: false, error: action.payload}
    } else {
        return state;
    }
}

export {shapesReducer, shapesDataReducer, shapesContentReducer, shapesUpdateReducer, shapesDeleteReducer}