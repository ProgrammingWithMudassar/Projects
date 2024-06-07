

type Props = {
    text: string;
    styles?: string
}

const Label = ({ text, styles = "w-full p-2" }: Props) => {
    return (
        <div className={`bg-brand-primary_light rounded-xl ${styles}`} >
            <h2 className='text-center text-brand-primary font-semibold 3xl:text-[22px] text-[16px]'>{text}</h2>
        </div>
    )
}

export default Label