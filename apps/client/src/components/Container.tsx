const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 md:p-16 flex w-full md:items-center justify-center h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-primary rounded-xl shadow-3xl overflow-hidden">
        <div className="flex flex-col items-center justify-between gap-8 p-8  xl:p-16">
          <div className="w-full">{children}</div>

          <div>
            <p className="text-center">{`Copyright © ${new Date().getFullYear()} EasyGenerators, All Right Reserved`}</p>
          </div>
        </div>
        <div className="hidden md:block">
          <img
            className="w-full h-full object-cover"
            src="https://cdn.pixabay.com/photo/2023/11/11/10/18/mountain-8380938_1280.jpg"
            alt="Login"
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
