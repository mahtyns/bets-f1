
interface EntriesProps {
    entryNumber: number
}

export const EntriesStatus = (props: EntriesProps) => {
    return (
        <div className="entries">
            <img />
            {props.entryNumber} ENTRIES IN
        </div>
    )
}
