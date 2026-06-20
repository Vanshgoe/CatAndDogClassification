const Footer = () => {
    return (
        <footer className="w-full mt-12 pb-6 px-3 sm:px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white border-4 border-black rounded-3xl shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <span className="font-black text-base sm:text-lg">
            Built using PyTorch + React
          </span>

                    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 font-bold">
                        <a
                            href="https://github.com/Vanshgoe"
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 bg-yellow-100 border-4 border-black rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition text-sm sm:text-base"
                        >
                            GitHub
                        </a>

                        <a
                            href="https://www.linkedin.com/in/vansh-goel-06a7401ab"
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 bg-blue-100 border-4 border-black rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition text-sm sm:text-base"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;