import LoadStyle from '../CSS/Loading.module.css'

export default function Loading() {
    return (
        <div>
            <div className={LoadStyle["loading-circle"]}></div>
        </div>
    )
}