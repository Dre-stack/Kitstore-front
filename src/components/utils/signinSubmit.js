import { SubmissionError } from 'redux-form';
import axios from 'axios';

const signinSubmit = async (values) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/v1/users/signin',
      {
        ...values,
      }
    );
    return response.data;
  } catch (err) {
    // const errMessage = err.response.data.message;
    if (err.response.data) {
      throw new SubmissionError({ _error: err.response.data });
    }
  }
};

export default signinSubmit;
