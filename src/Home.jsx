import DecryptedText from "./DecryptedText";

export default function Home() {
  return (
    <div className="w-full h-full">
      {/* Background Video (fixed) */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        muted
        loop
        playsInline>
        <source src="/Hero2.webm" type="video/mp4" />
      </video>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-white text-center bg-black/50">
        <h1 className="font-Merriweather text-6xl font-light text-green-200">
          <DecryptedText
            text="Transparency and Trust"
            revealDirection="start"
            speed={150}
            maxIterations={20}
            animateOn="view"
            sequential="true"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="font-Merriweather text-6xl font-light"
          />
        </h1>
        <p className="font-Nunito text-8xl font-extrabold text-green-400">
          From Farm to{" "}
          <span className="font-Sirivennela text-9xl text-green-200">
            Fork𐂐
          </span>
        </p>
        <p className="font-light text-2xl">
          <DecryptedText
            text="With FieldLedger."
            revealDirection="start"
            speed={100}
            maxIterations={20}
            sequential="true"
            characters="BLOCKCHAIN"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
            animateOn="hover"
          />
        </p>
      </section>

      {/* Our Solution (slides over video) */}
      <section className="h-screen flex items-center justify-center bg-white text-4xl font-semibold shadow-2xl">
        🌍 Our Solution
      </section>

      {/* Another Section */}
      <section className="h-screen flex items-center justify-center bg-gray-200 text-4xl font-semibold">
        ⚙️ Tech Stack
      </section>
    </div>
  );
}
