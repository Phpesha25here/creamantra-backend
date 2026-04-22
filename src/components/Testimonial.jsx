export default function Testimonial() {
  const testimonials = [
    {
      name: "Siddhesh Lad",
      role: "5 Star Reviewer",
      review:
        "Pav bhaji and falooda ,Both dishes remain cornerstones of Indian casual dining, each offering its own memorable taste experience.must visit this 😍.",
    },
    {
      name: "JoJo",
      role: "Budget Friendly",
      review:
        "Nikhil Food Hub at food lovers corner often busy especially evening, weekends and holidays having tasty and fresh ice cream of variety kulfi and falooda along with live tawa and pav bhaji. Service was prompt, fast and good.",
    },
    {
      name: "Ninad Darkar ",
      role: "Great Ambience",
      review:
        "Fr bhai really cool said that it is very tight bhai staff is really cool nice reee in truth once you go there I don't feel like leaving, I feel like staying inside, Fr one day I will stay there cool, I will try everything fsss",
    },
  ];

  return (
    <div className="my-20 flex flex-wrap justify-center gap-10">
      {testimonials.map((item, index) => {
        const isMiddle = index === 1;

        return (
          <div key={index} className="group perspective-[1000px]">
            
            {/* CARD */}
            <div className="relative w-80 h-60 transition-transform duration-700 transform-3d group-hover:transform-[rotateY(-180deg)]">
              
              {/* FRONT SIDE */}
              <div
                className={`absolute w-full h-full rounded-xl flex flex-col justify-center items-center border-2 backface-hidden
                ${
                  isMiddle
                    ? "bg-orange-500 text-white border-yellow-400"
                    : "bg-white text-gray-800 border-yellow-400"
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold
                  ${isMiddle ? "bg-white/20 text-white" : "bg-orange-100 text-orange-500"}`}
                >
                  {item.name.charAt(0)}
                </div>

                <h1 className="mt-4 text-lg font-semibold">
                  {item.name}
                </h1>
                <p className="text-sm opacity-80">{item.role}</p>
              </div>

              {/* BACK SIDE */}
              <div className="absolute w-full h-full bg-white border-2 border-yellow-400 rounded-xl px-6 py-4 flex flex-col justify-center items-center text-center transform-[rotateY(180deg)] backface-hidden shadow-lg">
                <p className="text-gray-600 text-sm mb-4">
                  {item.review}
                </p>

                {/* STARS */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 22 20"
                      fill="#FFB800"
                    >
                      <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" />
                    </svg>
                  ))}
                </div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}