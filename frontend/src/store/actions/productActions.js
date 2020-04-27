import { get } from '../../helpers/communicationHelper';

export const getProducts = () => {
    return (dispatch) => {

        get("/product/getProducts")
            .then(response => response.data)
            .then(data => {
                console.log('data', data);
            }).catch(err => console.log("Some Error Occurred!"));
    }
}