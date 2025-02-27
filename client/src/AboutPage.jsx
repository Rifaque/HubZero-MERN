import React from "react";



const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6 flex flex-col items-center">
      {/* About Section */}
      <section className="max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">About Hub Zero</h1>
        <p className="text-lg mb-6">
          Founded in 2024, Hub Zero is a team of engineers passionate about advancing technology and design.
          With expertise in software, web development, and embedded systems, we create innovative solutions for real-world challenges.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="max-w-4xl text-center mt-6">
        <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
        <p className="text-lg mt-3 text-gray-700">
          We aim to push the boundaries of engineering and creativity by delivering high-quality, cutting-edge solutions.
        </p>
      </section>

      {/* Expertise / Tech Stack */}
      <section className="max-w-4xl text-center mt-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Expertise</h2>
        <ul className="mt-4 text-lg text-gray-700 grid grid-cols-2 gap-3">
          <li>Full-Stack Web Development</li>
          <li>Software Development</li>
          <li>UI/UX Design</li>
          <li>Graphic Design</li>
          <li>Embedded Systems</li>
        </ul>
      </section>

      {/* Team Section */}
      <section className="max-w-4xl text-center mt-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Team</h2>
        <p className="text-lg mt-3">Meet the minds behind Hub Zero.</p>
        <Link to="/team">
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            View Our Team
          </button>
          </Link>
      </section>
    </div>
  );
};

export default AboutPage;
