import Progress from './Progress'

const BlurredProgress = ({ opacity }) => {
    return <>
        <div
            className={`absolute top-0 right-0 bottom-0 left-0 bg-white grid place-items-center md:rounded-lg ${opacity || 'opactiy-60'} blur`}
        >

        </div>
        <div
            className="absolute top-0 right-0 bottom-0 left-0 bg-transparent grid place-items-center z-10"
        >

            <Progress
                className="my-12"
            />
        </div>
    </>
}

export default BlurredProgress
