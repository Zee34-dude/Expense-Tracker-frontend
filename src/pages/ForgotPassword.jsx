import forgotImage from '../assets/forgotPassword_image.png'

const ForgotPassword = () => {
  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left Section */}
      <div className="bg-blue-600 text-white flex flex-col md:justify-start md:items-start md:pt-35   p-10 md:w-2/5">
        <h1 className="text-4xl font-bold mb-4 text-center lg:text-left lg:pt-10">
          Forgot your <br /> password.
        </h1>
        <p className="text-lg mb-8 text-center lg:text-left">
          Don't worry, we'll help you get back in.
        </p>

        <div className="flex justify-center items-center">
          <img src={forgotImage} alt="Forgot Password Illustration" className="w-64 md:w-70 lg:w-96"/>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center text-center p-6 sm:p-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-grey-600">Reset your password!</h2>
          <p className="text-gray-600 mb-6 md:mb-10 md:mt-10">
            Enter your email and we will send you a link to <br /> reset your password
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-start">Email</label>

              <input type="email" placeholder="Enter" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="mt-60">
              <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-700 shadow-md">
              Reset password
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;