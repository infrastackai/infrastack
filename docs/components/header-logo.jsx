import { IconInfraStackOctopusDark } from "@components/icons";

export default function HeaderLogo() {
  return (
    <span
      className="font-bold select-none"
      title={`InfraStack`}
    >
      <IconInfraStackOctopusDark className="h-8 w-8 inline mr-2 fill-indigo-600 dark:fill-white text-white dark:text-zinc-800" />
      InfraStack
    </span>
  );
}