import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ChainOnlyButton() {
  return (
    <ConnectButton.Custom>
      {({ chain, openChainModal }) => {
        return (
          <button
            onClick={openChainModal}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
            {chain?.icon && (
              <img
                src={chain.iconUrl}
                alt={chain.name ?? "Chain"}
                className="w-6 h-6"
              />
            )}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
