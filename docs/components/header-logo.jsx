import { IconInfraStackOctopusDark } from "@components/icons";

export default function HeaderLogo() {
  return (
    <span
      className="font-bold select-none"
      title={`InfraStack AI`}
    >
      <IconInfraStackOctopusDark className="h-8 w-8 inline mr-2 fill-infrastackLight dark:fill-white text-white dark:text-infrastackLight" />
      InfraStack AI
    </span>
  );
}