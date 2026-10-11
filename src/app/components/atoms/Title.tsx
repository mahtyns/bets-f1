
interface TitleProps {
    title: string,
    isH1: boolean,
}

const Title = (props: TitleProps) => {

    return (
        <>
            {
                props.isH1 ?
                    <h1 className={`title-h1`}>
                        {props.title}
                    </h1> :
                    <h2 className={`title-h2`}>
                        {props.title}
                    </h2>
            }
        </>
    )
}

export default Title