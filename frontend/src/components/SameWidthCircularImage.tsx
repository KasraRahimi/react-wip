import "./component-styles.css"
import {MouseEventHandler} from "react";

interface SameWidthCircularImageProps {
    src: string;
    alt?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLImageElement>;
}

function SameWidthCircularImage({ src, alt, className, onClick }: SameWidthCircularImageProps) {
    let imageClass = "rounded-circle img-fluid"
    if (onClick) imageClass += " clickable-image";
    return (
        <div className={`container ${className ? className : ""}`}>
            <div className="square-container">
                <img src={src} alt={alt} className={imageClass} onClick={onClick} />
            </div>
        </div>
    )
}

export default SameWidthCircularImage;