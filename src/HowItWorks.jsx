import React from "react";
import { Bed as Seed, Truck, Store, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Seed,
      title: "Food Registration",
      description:
        "Farmers register their products and farming practices on the blockchain network.",
      color: "emerald",
    },
    {
      icon: Truck,
      title: "Supply Chain Tracking",
      description:
        "Every step from harvest to distribution is recorded with timestamps and locations.",
      color: "sky",
    },
    {
      icon: Store,
      title: "Retail Integration",
      description:
        "Products reach stores with complete traceability and authenticity verification.",
      color: "amber",
    },
    {
      icon: CheckCircle,
      title: "Consumer Verification",
      description:
        "End consumers can verify the complete journey of their food products instantly.",
      color: "green",
    },
  ];

  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600",
    sky: "bg-sky-100 text-sky-600",
    amber: "bg-amber-100 text-amber-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-6xl font-Nunito font-bold text-white text-shadow-lg/20 mb-6 hover:underline hover:tracking-widest cursor-pointer hover:text-green-500">
            How
            <span className="text-6xl font-Nunito font-extrabold text-white text-shadow-lg/20 mb-6 hover:scale-110 hover:tracking-widest cursor-pointer inline mr-6 ml-6 hover:text-green-500">
              Field
              <span className="inline text-green-500 hover:text-white">
                Ledger
              </span>
            </span>
            Works
          </h1>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        colorClasses[step.color]
                      }`}>
                      <step.icon className="w-7 h-7" />
                    </div>
                    <div className="text-3xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-Nunito font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
