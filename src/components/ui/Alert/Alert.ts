import Swal, { SweetAlertIcon } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Alert = {
  alert(title: string, text: string, icon: SweetAlertIcon | null) {
    MySwal.fire({
      title: title,
      text: text,
      icon: icon ?? 'question',
    })
  },
}

export default Alert
