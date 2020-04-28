import { get } from '../../helpers/communicationHelper';

export const getProducts = (data) => {
    return (dispatch) => {
        let query = "/product?";

        for (let key in data) {
            if (data[key] != "")
                query += "&" + key + "=" + data[key];
        }

        console.log('query', query);

        get(query)
            .then(data => {
                console.log('data', data);

                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data
                });

            }).catch(err => console.log("Some Error Occurred!"));
    }
}