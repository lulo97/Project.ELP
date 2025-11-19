import { useEffect, useState } from "react"
import { message } from "../../providers/MessageProvider";

const EMPTY_STATE = {
    model_name: "123", //Table CONSTS key = MODEL_NAME
    //Rows of prompts table
    prompts: [
        {}
    ]
}

export function ModelInformation() {
    const [state, setState] = useState(EMPTY_STATE)

    async function fetchData() {
        const result = await getModelInformation(); //Return { model_name, prompts }

        if (result.error) {
            message({ type: "error", text: result.error })
            return;
        }

        setState(result.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    async function updateConsts() {
        const result = await updateConsts({ key: "MODEL_NAME", value: state.model_name }); //Return { model_name, prompts }

        if (result.error) {
            message({ type: "error", text: result.error })
            return;
        }

        fetchData();
    }    

    return <div>
        <div>
            
        </div>
    </div>
}