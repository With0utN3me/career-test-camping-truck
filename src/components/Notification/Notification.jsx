import css from "./Notification.module.css"
const Notification = ({text}) => {
    return (
        <p className={css["notification"]}>{text}</p>
    )
}
export default Notification;