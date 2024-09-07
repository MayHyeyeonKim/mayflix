import './PreviewModal.style.css'
import { usePreviewQuery } from '../../../hooks/useMoviePreviewQuery';

const PreviewModal = ({id, setModalShow}) => {
    const { data, isLoading, isError, error } = usePreviewQuery({id});
    console.log("Previwww: ", data)

    return (
        <div className="preview-modal">
            <div className='x' onClick={()=>{setModalShow(false)}}> X </div>
            <iframe src={`https://www.youtube.com/embed/${data?.results[0]?.key}`}></iframe>
            
        </div>
    )
}

export default PreviewModal;