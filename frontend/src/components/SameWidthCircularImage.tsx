import "./component-styles.css"

interface SameWidthCircularImageProps {
    src: string;
    alt?: string;
    className?: string;
}

function SameWidthCircularImage({ src, alt, className }: SameWidthCircularImageProps) {
    return (
        <div className={`container ${className}`}>
            <div className="square-container">
                <img src={src} alt={alt} className="rounded-circle img-fluid" />
            </div>
        </div>
    )
}

export default SameWidthCircularImage;