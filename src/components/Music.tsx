const Music = (props: { id: number; icon: string; title: string ; author: string; album: string; duration: number; }) => {
  
    return ( 
        <div className='music-Container'>
            <button>{props.id}</button>
            <img aria-hidden="false" draggable="false" loading="eager" src={props.icon} alt=""></img>
            <div>
                <p>{props.title}</p>
                <p>{props.author}</p>    
            </div>
            <p>{props.album}</p>
            <p>{props.duration}</p>
        </div>
     );
}
 
export default Music;