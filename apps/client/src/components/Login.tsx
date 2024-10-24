

function Login() {
	return (
		<div  className="w-full flex flex-col gap-5">
			 <div className="flex justify-center">
        <h2 className="text-3xl font-bold text-pastelBlue">Login</h2>
      </div>
		<form action="" className="w-full flex flex-col gap-3 sm:gap-4">
			<div className="join bg-primary shadow-2xl p-2 flex items-center">
				<label className="px-3 py-1 text-lg join-item text-pastelBlue border-r border-r-slate-400">
					<i className="fa-solid fa-phone"></i>
				</label>
				<input
					type="number"
					className="px-3 py-2 w-full text-sm join-item outline-none bg-transparent"
					placeholder="Phone Number"
				/>
			</div>
			<div className="join bg-primary shadow-2xl p-2 flex items-center">
				<label className="px-3 py-1 text-lg join-item text-pastelBlue border-r border-r-slate-400">
					<i className="fa-solid fa-lock"></i>
				</label>
				<input
					type="password"
					className="px-3 py-2 w-full text-sm join-item outline-none bg-transparent"
					placeholder="Enter Password"
				/>
			</div>
			<div className=" py-4 flex flex-row gap-3 items-center justify-between">
				<div className="form-control">
					<label className="label cursor-pointer">
						<input type="checkbox" className="checkbox checkbox-error" />
						<span className="sm:text-sm text-pastelBlue pl-2">Remember me</span>
					</label>
				</div>
				<div>
					<a className="sm:text-sm hover:text-acent" href="#">
						Forget Password
					</a>
				</div>
			</div>
			<button className="fill-btn btn-large">
				<a href="user-dashboard.html">Login <i className="fa-solid fa-paper-plane"></i></a>
			</button>
		</form>
	
	</div>
	)
}

export default Login