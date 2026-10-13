interface PoolStatusProps {
    variant: 'open' | 'closed'
}

const variantClasses: Record<PoolStatusProps['variant'], string> = {
    open: 'pool-status--open',
    closed: 'pool-status--closed',
};

export const PoolStatus = (props: PoolStatusProps) => {
    return (
        <div className={`pool-status ${variantClasses[props.variant]}`}>
            {
                props.variant === 'open' ? "Pool open" : "Pool closed now"
            }
        </div>
    )
}
