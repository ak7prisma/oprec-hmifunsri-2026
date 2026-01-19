export default function CountdownItem({ val, label }: Readonly<{ val: number, label: string }>) {
    return(
        <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                <span className="text-xl md:text-3xl font-bold font-mono text-white">
                    {val < 10 ? `0${val}` : val}
                </span>
            </div>
            <span className="text-[10px] md:text-xs uppercase mt-1 text-cyan-200 font-bold">{label}</span>
        </div>
    );
}