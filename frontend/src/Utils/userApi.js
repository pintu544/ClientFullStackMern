import axios from "axios";
const api_url = "http://localhost:5000";

// add new user api
export const addUser = async (userData) => {
  console.log(userData);
  try {
    const response = await axios({
      method: "POST",
      url: `${api_url}/createUser`,
      data: userData
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// on delete user api
export const onDeleteUser = async(id) =>{
  console.log(id);
  try {
    const response = await axios({
      method: "DELETE",
      url: `${api_url}/deleteUser/${id}`,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// update user
export const updateUser= async(idForUpdate, userData) =>{
  console.log(idForUpdate, userData);
  try {
      const response = await axios({
        method: "PATCH",
        url: `${api_url}/updateUser/${idForUpdate}`,
        data: {...userData}
      });
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
}