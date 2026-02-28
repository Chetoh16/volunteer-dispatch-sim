const Timer = (props: { time: number }) => {

    // could also just use props.time going forward
    const time = props.time;

    // floor returns the largest integer value 
    const minutes = Math.floor(time/60);

    // would give remainder i.e. 299 MOD 60 is 59 
    const seconds = time % 60;

    // Add leading zero 
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 
                    bg-black text-white px-6 py-2 rounded-xl 
                    text-xl font-bold shadow-lg">
        Time Remaining: {minutes}:{formattedSeconds}s
    </div>
    );
};

export default Timer;