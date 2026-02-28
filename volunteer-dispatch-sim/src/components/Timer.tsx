const Timer = (props: { time: number }) => {

    // could also just use props.time going forward
    const time = props.time;

    return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 
                    bg-black text-white px-6 py-2 rounded-xl 
                    text-xl font-bold shadow-lg">
        Time Remaining: {time}s
    </div>
    );
};

export default Timer;