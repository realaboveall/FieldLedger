import React from "react";
import { Shield, TrendingUp, Users, Globe, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Transparent Supply Chain",
      description:
        "Ensure trust at every step with immutable blockchain records, making farm-to-fork tracking effortless and reliable.",
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description:
        "Real-time insights and predictive analytics help optimize crop yields and market opportunities.",
    },
    {
      icon: Users,
      title: "Connected Community",
      description:
        "Empower farmers, distributors, and retailers to collaborate seamlessly in a decentralized, trustworthy marketplace.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Expand your agricultural business beyond borders with simplified access to international buyers and markets.",
    },
    {
      icon: Zap,
      title: "Fast & Secure Payments",
      description:
        "Enable instant, low-cost cryptocurrency payments, reducing delays and ensuring fair compensation for every participant.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-6xl md:text-8xl font-Orbitron font-bold text-white text-shadow-lg/20 mb-6 hover:scale-110 hover:tracking-widest cursor-pointer ">
            Features
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
