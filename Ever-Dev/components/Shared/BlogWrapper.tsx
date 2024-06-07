
type Props = {
    style?: string;
    id: string;
    children: React.ReactNode
}

const BlogWrapper = ({ id, style, children }: Props) => {
    return (
        <section id={id} className={`w-full ${style}`} >
            <div className='w-full h-full max-w-[1000px] mx-auto md:px-8 px-4 ' >
                {children}
            </div>
        </section>
    )
}

export default BlogWrapper