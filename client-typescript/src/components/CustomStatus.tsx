function CustomStatus({ isLogin }) {
    return (
        <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className={`h-2 w-2 rounded-full ${isLogin ? 'bg-emerald-500' : 'bg-[#ee1d4f]'}`} />
            </div>
            <p className="text-xs font-semibold leading-5 text-white">{isLogin ? 'Online' : 'Offline'}</p>
        </div>
    )
}

export default CustomStatus