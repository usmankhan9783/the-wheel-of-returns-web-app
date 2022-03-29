import "./notification.scss"
import errorIcon from "./../../assets/images/error.svg"
import successIcon from "./../../assets/images/success.svg"
import { toast } from 'react-toastify';


export function notification( type, notify) {
       const icons = {
           error: errorIcon,
           success: successIcon
       }
       const message =  (
        <div className="notification">
            <img className='icon' src={icons[type]} alt="icon" />
            <p className='message'>{notify}</p>
        </div>
      )
        switch (type) {
            case "error":
              return toast(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            case "success":
            return toast(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            default:
            return;
          }
}
