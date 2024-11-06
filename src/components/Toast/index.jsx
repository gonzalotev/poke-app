import { toast } from 'react-toastify';

const Toast = (type, message) => {
  if (type === 'success') {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      style: {
        backgroundColor: 'green',
        color: 'white',
      },
    });
  } else if (type === 'error') {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      closeButton: true,
      style: {
        backgroundColor: 'red',
        color: 'white',
      },
    });
  }
};

export default Toast;
