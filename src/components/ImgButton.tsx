import { Button } from "react-bootstrap";

interface ImgButtonProps {
    src: string;
    variant: string;
    className?: string;
    onClick?: () => void;
}

export function ImgButton(props: ImgButtonProps) {
    return (
        <Button 
            variant={props.variant}
            className={props.className}
            onClick={props.onClick}
        >
            <img 
                src={props.src}
                className="w-100 h-100"
            />
        </Button>
    );
}