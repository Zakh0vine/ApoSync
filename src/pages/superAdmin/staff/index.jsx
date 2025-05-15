import { Button } from "@/components/button";

export default function Staff({ isModal = false, onClose }) {
  return (
    <div className={`${isModal ? "" : "min-h-screen"} bg-white`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>
        </div>

        {/* Form Fields */}
        <div className="w-full">
          <form className="flex flex-col gap-6">
            {/* First Name & Last Name */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col w-full">
                <label className="mb-2 text-base sm:text-lg font-medium">
                  Nama Depan
                </label>
                <input
                  type="text"
                  defaultValue="Fasha"
                  className="border border-[#858585] rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="mb-2 text-base sm:text-lg font-medium">
                  Nama Belakang
                </label>
                <input
                  type="text"
                  defaultValue="Agatha"
                  className="border border-[#858585] rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="flex flex-col relative">
              <label className="mb-2 text-base sm:text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                defaultValue="fashaagatha@gmail.com"
                className="border border-[#858585] rounded-md p-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="flex flex-col relative">
              <label className="mb-2 text-base sm:text-lg font-medium">
                Kata Sandi
              </label>
              <input
                type="password"
                defaultValue="Abcd1234"
                className="border border-[#858585] rounded-md p-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="flex flex-col relative">
              <label className="mb-2 text-base sm:text-lg font-medium">
                Ulangi Kata Sandi
              </label>
              <input
                type="password"
                defaultValue="Abcd1234"
                className="border border-[#858585] rounded-md p-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
              <Button
                onClick={onClose}
                type="button"
                className="border border-[#6499E9] !text-[#6499E9] hover:bg-blue-50 bg-transparent rounded-md px-6 py-2.5 text-base font-semibold w-full sm:w-auto"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-[#6499E9] hover:bg-blue-600 text-white rounded-md px-6 py-2.5 text-base font-semibold w-full sm:w-auto"
              >
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
