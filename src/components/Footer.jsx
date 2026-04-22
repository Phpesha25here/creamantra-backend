export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white py-10 px-6 flex flex-col items-center text-center gap-4">

      {/* Address */}
      <p className="max-w-md">
         Shop No 10, Poonam Tower, Dharshana Society, Sector 20, Nerul, Navi Mumbai, Maharashtra 400706
      </p>

      {/* Social Icons */}
      <div className="flex gap-6 mt-2">

        {/* Instagram */}
        <a
          href="https://www.instagram.com/creamantra_?igsh=MXYydmtmeXFtc210ZA="
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 hover:scale-110 transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" />
          </svg>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com/@icecreamantra?si=EyU_UJ2wAYNseZNC"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 hover:scale-110 transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 50 50 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 50 50 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
            <path d="M10 15l5-3-5-3z" />
          </svg>
        </a>

        {/* Google Maps */}
        <a
          href="https://www.google.com/maps/dir//CREAMANTRA,+Shop+No+10,+Poonam+Tower,+Dharshana+Society,+Sector+20,+Nerul,+Navi+Mumbai,+Maharashtra+400706/@19.0210995,73.0523336,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3be7c3000a9a8103:0x28c34784fc1f56b4!2m2!1d73.0127383!2d19.0367949?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 hover:scale-110 transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </a>

      </div>

      {/* Copyright */}
      <p className="text-sm mt-3">
        © 2024 Your Brand
      </p>

    </footer>
  );
}