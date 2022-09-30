import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from "../types"

const initialState ={
    loading: false,
    task: [],
    error:''
}

export const taskReducer=(state = initialState, action)=>{
    switch(action.type){

        case TASKS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case TASKS_SUCCESS:
            return{
                
                loading:false,
                error:'',
                task:action.payload
            }
        case TASKS_FAILURE:
            return{
                loading:false,
                error:action.payload,
                task:[]
            }



        default:
            return state
    }
    
}